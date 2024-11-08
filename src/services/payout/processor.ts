import { Prisma, payout, payout_status } from '@prisma/client';
import { DateTime } from 'luxon';
import { prisma } from '../../connectors/db';

export class PayoutProcessor {
    private static updatePayoutStatus = async (
        id: number,
        status: payout_status
    ): Promise<payout> => {
        const updateData: Prisma.payoutUpdateInput = {
            status,
        };

        if (status === payout_status.SETTLED) {
            updateData.settled_at = DateTime.utc().toISO();
        }

        return await prisma.payout.update({
            where: { id },
            data: updateData,
        });
    };

    private static handleApproved = async (payout: payout): Promise<payout> => {
        console.log(`Processing approved payout: ${payout.id}`);
        try {
            const processingPayout = await PayoutProcessor.updatePayoutStatus(
                payout.id,
                payout_status.PROCESSING
            );
            return await PayoutProcessor.processUpdatedPayout(
                processingPayout,
                payout
            );
        } catch (error) {
            console.log(
                `Error processing approved payout ${payout.id}:`,
                error
            );
            return await PayoutProcessor.updatePayoutStatus(
                payout.id,
                payout_status.FAILED
            );
        }
    };

    private static handleProcessing = async (
        payout: payout
    ): Promise<payout> => {
        console.log(`Processing payout in processing state: ${payout.id}`);
        try {
            const settledPayout = await PayoutProcessor.updatePayoutStatus(
                payout.id,
                payout_status.SETTLED
            );
            return await PayoutProcessor.processUpdatedPayout(
                settledPayout,
                payout
            );
        } catch (error) {
            console.log(`Error settling payout ${payout.id}:`, error);
            return await PayoutProcessor.updatePayoutStatus(
                payout.id,
                payout_status.FAILED
            );
        }
    };

    public static processUpdatedPayout = async (
        updatedPayout: payout,
        existingPayout?: payout
    ): Promise<payout> => {
        if (existingPayout?.status === updatedPayout.status) {
            console.log(`Payout status unchanged for id ${updatedPayout.id}`);
            return updatedPayout;
        }

        try {
            switch (updatedPayout.status) {
                case payout_status.APPROVED:
                    return await PayoutProcessor.handleApproved(updatedPayout);

                case payout_status.PROCESSING:
                    return await PayoutProcessor.handleProcessing(
                        updatedPayout
                    );

                case payout_status.SETTLED:
                    console.log(
                        `Payout ${updatedPayout.id} settled successfully`
                    );
                    return updatedPayout;

                case payout_status.FAILED:
                    console.log(`Payout ${updatedPayout.id} failed`);
                    return updatedPayout;

                default:
                    console.log(
                        `Invalid payout status for id ${updatedPayout.id}: ${updatedPayout.status}`
                    );
                    return await PayoutProcessor.updatePayoutStatus(
                        updatedPayout.id,
                        payout_status.FAILED
                    );
            }
        } catch (error) {
            console.log(
                `Unexpected error processing payout ${updatedPayout.id}:`,
                error
            );
            return await PayoutProcessor.updatePayoutStatus(
                updatedPayout.id,
                payout_status.FAILED
            );
        }
    };
}
