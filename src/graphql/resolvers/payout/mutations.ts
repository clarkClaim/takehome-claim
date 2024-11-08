import { builder } from '../../schema/builder';
import { prisma } from '../../../connectors/db';
import { PayoutCreateInput } from './inputs';
import { removeNullsFromType } from '../../../utils';
import * as Payout from '../../../services/payout';

builder.mutationField('insert_payout_one', (t) =>
    t.prismaField({
        type: 'payout',
        args: {
            data: t.arg({ type: PayoutCreateInput, required: true }),
        },
        resolve: async (query, root, args) => {
            // TODO: Add sensible validations to payout inputs
            // assuming that any row created in this table would
            // result in an immediate cash payout to the user
            const payout = await prisma.payout.create({
                ...query,
                data: removeNullsFromType(args.data),
            });
            return await Payout.processor.processUpdatedPayout(payout);
        },
    })
);

builder.mutationField('process_user_redemptions', (t) =>
    t.prismaField({
        type: ['payout'],
        args: { userId: t.arg({ type: 'String', required: true }) },
        resolve: async (query, root, args) => {
            return await Payout.redemption.processUserRedemptions(args.userId);
        },
    })
);
