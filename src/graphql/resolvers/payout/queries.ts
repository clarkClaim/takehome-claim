import { builder } from '../../schema/builder';
import { PayoutWhereInput, PayoutOrderByInput } from './inputs';
import { prisma } from '../../../connectors/db';
import { removeNullsFromType } from '../../../utils';

builder.queryField('payout', (t) =>
    t.prismaField({
        type: ['payout'],
        args: {
            where: t.arg({ type: PayoutWhereInput }),
            orderBy: t.arg({ type: PayoutOrderByInput }),
            limit: t.arg.int(),
            offset: t.arg.int(),
        },
        resolve: async (query, root, args) => {
            const where = removeNullsFromType(args.where);
            const orderBy = removeNullsFromType(args.orderBy);
            return await prisma.payout.findMany({
                ...query,
                take: args?.limit || undefined,
                skip: args?.offset || undefined,
                where: where || undefined,
                orderBy: orderBy || undefined,
            });
        },
    })
);

builder.queryField('payout_by_pk', (t) =>
    t.prismaField({
        description: 'Get a payout by its primary key',
        type: 'payout',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: async (query, root, { id }) => {
            const payout = await prisma.payout.findUniqueOrThrow({
                ...query,
                where: { id },
            });
            return payout;
        },
    })
);
