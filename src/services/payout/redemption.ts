import { prisma } from '../../connectors/db';
import * as Payout from '.';
import {
    Prisma,
    claim,
    financial_transaction,
    payout,
    payout_status,
} from '@prisma/client';
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
    financial_transaction: financial_transaction;
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
        const usedTransactionIds = new Set<number>();

        // Match claims with unused transactions based on brand_id and dates
        for (const claim of user.claims) {
            const brandId = claim.campaign.brand.id;

            const matchingTransactions = user.financial_transactions.filter(
                (tx) =>
                    // Match Claims to transactions with the same brand_id
                    tx.brand_id === brandId &&
                    // where the transaction date is on or after the date (note: not time, as financial_transactions
                    // are rounded to the nearest day) that the Claim was created
                    DateTime.fromJSDate(tx.date) >=
                        DateTime.fromJSDate(claim.created_at).startOf('day') &&
                    // and the transaction has not already been used for a payout
                    !usedTransactionIds.has(tx.id) &&
                    // and the transaction amount is greater than a minimum amount of $1
                    tx.amount.gte(1)
            );

            // Only use first matching transaction
            if (matchingTransactions.length > 0) {
                const tx = matchingTransactions[0];
                usedTransactionIds.add(tx.id);
                redeemedClaims.push({
                    claim,
                    financial_transaction: tx,
                });
            }
        }

        return redeemedClaims;
    };

    private createPayout = async (redeemedClaims: RedeemedClaim) => {
        const payoutAmount = Prisma.Decimal.min(
            redeemedClaims.claim.value,
            redeemedClaims.financial_transaction.amount
        );

        if (payoutAmount.lte(0)) {
            console.log(
                `Payout amount is less than or equal to 0 for claim ${redeemedClaims.claim.id}`
            );
            return null;
        }

        return await prisma.payout.create({
            data: {
                user_id: redeemedClaims.claim.owner_id,
                claim_id: redeemedClaims.claim.id,
                financial_transaction_id:
                    redeemedClaims.financial_transaction.id,
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
