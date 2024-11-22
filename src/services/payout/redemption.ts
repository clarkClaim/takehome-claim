import { prisma } from '../../connectors/db';
import * as Payout from '.';
import { Prisma, claim, purchase, payout, payout_status } from '@prisma/client';
import { userRedemptionContextInclude } from './types';
import { DateTime } from 'luxon';

type RedeemedClaim = {
    claim: claim & {
        campaign: {
            brand: {
                id: number;
            };
        };
    };
    purchase: purchase;
};

export class RedemptionService {
    private findRedeemedClaims = async (
        userId: string
    ): Promise<RedeemedClaim[]> => {
        const user = await prisma.user.findUniqueOrThrow({
            where: { id: userId },
            ...userRedemptionContextInclude,
        });

        const redeemedClaims: RedeemedClaim[] = [];
        const usedPurchaseIds = new Set<number>();

        // Match claims with unused purchases based on brand_id and dates
        for (const claim of user.claims) {
            const brandId = claim.campaign.brand.id;

            const matchingPurchases = user.purchases.filter(
                (purchase) =>
                    // Match Claims to purchases with the same brand_id
                    purchase.brand_id === brandId &&
                    // where the transaction date is on or after the date (note: not time, as purchases
                    // are rounded to the nearest day) that the Claim was created
                    DateTime.fromJSDate(purchase.date) >=
                        DateTime.fromJSDate(claim.created_at).startOf('day') &&
                    // and the transaction has not already been used for a payout
                    !usedPurchaseIds.has(purchase.id) &&
                    // and the transaction amount is greater than a minimum amount of $1
                    purchase.amount.gte(1)
            );

            // Only use first matching transaction
            if (matchingPurchases.length > 0) {
                const tx = matchingPurchases[0];
                usedPurchaseIds.add(tx.id);
                redeemedClaims.push({
                    claim,
                    purchase: tx,
                });
            }
        }

        return redeemedClaims;
    };

    private createPayout = async (redeemedClaim: RedeemedClaim) => {
        const payoutAmount = Prisma.Decimal.min(
            redeemedClaim.claim.value,
            redeemedClaim.purchase.amount
        );

        if (payoutAmount.lte(0)) {
            console.log(
                `Payout amount is less than or equal to 0 for claim ${redeemedClaim.claim.id}`
            );
            return null;
        }

        return await prisma.payout.create({
            data: {
                user_id: redeemedClaim.claim.owner_id,
                claim_id: redeemedClaim.claim.id,
                purchase_id: redeemedClaim.purchase.id,
                amount: payoutAmount,
                status: payout_status.APPROVED,
            },
        });
    };

    processRedemptions = async (userId: string) => {
        // Find all redeemed claims for the user
        const redeemedClaims = await this.findRedeemedClaims(userId);

        // Create payouts
        const payoutPromises = redeemedClaims.map((claim) =>
            this.createPayout(claim)
        );
        const payouts = (await Promise.all(payoutPromises)).filter(
            (payout) => payout !== null
        ) as payout[];

        // Run created payouts through processor
        const results = await Promise.all(
            payouts.map((payout) =>
                Payout.processor.processUpdatedPayout(payout)
            )
        );

        return results;
    };
}
