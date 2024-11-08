import { builder } from '../../schema/builder';
import { prisma } from '../../../connectors/db';
import { PayoutCreateInput } from './inputs';
import { removeNullsFromType } from '../../../utils';

builder.mutationField('insert_payout_one', (t) =>
    t.prismaField({
        type: 'payout',
        args: {
            data: t.arg({ type: PayoutCreateInput, required: true }),
        },
        resolve: async (query, root, args) => {
            return await prisma.payout.create({
                ...query,
                data: removeNullsFromType(args.data),
            });
        },
    })
);
