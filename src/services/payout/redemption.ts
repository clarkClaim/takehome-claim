import { prisma } from '../../connectors/db';
import * as Payout from '.';
import {
    Prisma,
    claim,
    financial_transaction,
    payout_status,
} from '@prisma/client';
import { userRedemptionContextInclude, UserRedemptionContext } from './types';
import { DateTime } from 'luxon';

type RedemptionMatch = {
    claim: claim & {
        campaign: {
            brand: {
                id: number;
            };
        };
    };
    financial_transaction: financial_transaction;
};

const findRedemptionMatches = async (
    userId: string
): Promise<RedemptionMatch[]> => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        ...userRedemptionContextInclude,
    });

    const matches: RedemptionMatch[] = [];
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
            matches.push({
                claim,
                financial_transaction: tx,
            });
        }
    }

    return matches;
};

const createPayoutFromRedemptionMatch = async (match: RedemptionMatch) => {
    const payoutAmount = Prisma.Decimal.min(
        match.claim.value,
        match.financial_transaction.amount
    );

    if (payoutAmount.lte(0)) {
        console.log(
            `Payout amount is less than or equal to 0 for claim ${match.claim.id}`
        );
        return null;
    }

    // TODO: Extract to Payout.create, add validation to all create calls

    return await prisma.payout.create({
        data: {
            user_id: match.claim.owner_id,
            claim_id: match.claim.id,
            financial_transaction_id: match.financial_transaction.id,
            amount: payoutAmount,
            status: payout_status.APPROVED,
        },
    });
};

export const processUserRedemptions = async (userId: string) => {
    const matches = await findRedemptionMatches(userId);
    const results = [];

    for (const match of matches) {
        try {
            const payout = await createPayoutFromRedemptionMatch(match);
            if (payout) {
                const processedPayout =
                    await Payout.processor.processUpdatedPayout(payout);
                results.push(processedPayout);
            }
        } catch (error) {
            console.log(
                `Error processing redemption for claim ${match.claim.id}:`,
                error
            );
        }
    }

    return results;
};
