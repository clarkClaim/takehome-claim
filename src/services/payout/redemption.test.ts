import { prisma } from '../../connectors/db';
import * as Payout from '.';
import * as User from '../user';
import { DateTime } from 'luxon';
import { execSync } from 'child_process';
import { payout_status } from '@prisma/client';

describe('Payout Redemption End-to-End', () => {
    beforeAll(async () => {
        // Reset the database to known state
        execSync('npm run prisma:reset -- --force', { stdio: 'inherit' });
    });

    it('should process a valid redemption for a new claim with matching transaction', async () => {
        const aliId = 'ali';
        const sweetgreenId = 1;
        // Verify active claims count
        const user = await prisma.user.findUniqueOrThrow({
            where: { id: aliId },
            include: {
                claims: {
                    where: User.types.activeClaimsWhere,
                    include: {
                        campaign: true,
                    },
                },
            },
        });
        expect(user.claims.length).toBe(1);
        // expect that one of the claims is for Sweetgreen
        const sweetgreenClaim = user.claims.find(
            (claim) => claim?.campaign?.brand_id === sweetgreenId
        );
        expect(sweetgreenClaim).toBeDefined();

        // Verify redeemed and expired claims
        const redeemedClaims = await prisma.claim.findMany({
            where: {
                owner_id: aliId,
                ...User.types.redeemedClaimsWhere,
            },
        });
        expect(redeemedClaims.length).toBe(1);

        const expiredClaims = await prisma.claim.findMany({
            where: {
                owner_id: aliId,
                ...User.types.expiredClaimsWhere,
            },
        });
        expect(expiredClaims.length).toBe(0);

        // Try redemption without transaction
        await Payout.redemption.processUserRedemptions(aliId);
        const activeClaimsAfterFirstTry = await prisma.claim.findMany({
            where: {
                owner_id: aliId,
                ...User.types.activeClaimsWhere,
            },
        });
        expect(activeClaimsAfterFirstTry.length).toBe(1);

        // Add matching transaction
        const transactionValue = 20.0;
        const transaction = await prisma.financial_transaction.create({
            data: {
                user_id: aliId,
                brand_id: sweetgreenId,
                amount: transactionValue,
                date: DateTime.now().toJSDate(),
                status: 'SETTLED',
            },
        });

        // Process redemptions
        await Payout.redemption.processUserRedemptions(aliId);

        // Verify redeemed claim
        const redeemedClaimsAfter = await prisma.claim.findMany({
            where: {
                owner_id: aliId,
                ...User.types.redeemedClaimsWhere,
            },
            include: {
                payout: true,
            },
        });
        expect(redeemedClaimsAfter.length).toBe(2);

        // Verify that there are now no active claims
        const activeClaimsAfterSecondTry = await prisma.claim.findMany({
            where: {
                owner_id: aliId,
                ...User.types.activeClaimsWhere,
            },
        });
        expect(activeClaimsAfterSecondTry.length).toBe(0);

        // Find the new payout
        const newPayout = redeemedClaimsAfter.find(
            (claim) => claim.payout?.financial_transaction_id === transaction.id
        )?.payout;

        expect(newPayout).toBeDefined();

        // The expected claim value should be the lesser of the transaction value or the claim value
        const claimValue = sweetgreenClaim?.value.toNumber() ?? 0;
        const expectedPayoutValue = Math.min(transactionValue, claimValue);

        expect(newPayout?.amount.toNumber()).toBe(expectedPayoutValue);

        // Wait for settlement
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Verify payout processing works as expected
        const settledPayout = await prisma.payout.findUniqueOrThrow({
            where: { id: newPayout?.id },
        });

        expect(settledPayout.status).toBe(payout_status.SETTLED);
        expect(settledPayout.settled_at).toBeDefined();
    });
});
