import { builder } from '../../schema/builder';
import { PurchaseWhereInput, PurchaseOrderByInput } from './inputs';
import { prisma } from '../../../connectors/db';
import { removeNullsFromType } from '../../../utils';

builder.queryField('purchase', (t) =>
    t.prismaField({
        type: ['purchase'],
        args: {
            where: t.arg({ type: PurchaseWhereInput }),
            orderBy: t.arg({ type: PurchaseOrderByInput }),
            limit: t.arg.int(),
            offset: t.arg.int(),
        },
        resolve: async (query, root, args) => {
            const where = removeNullsFromType(args.where);
            const orderBy = removeNullsFromType(args.orderBy);
            return await prisma.purchase.findMany({
                ...query,
                take: args?.limit || undefined,
                skip: args?.offset || undefined,
                where: where || undefined,
                orderBy: orderBy || undefined,
            });
        },
    })
);

builder.queryField('purchase_by_pk', (t) =>
    t.prismaField({
        description: 'Get a purchase by its primary key',
        type: 'purchase',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: async (query, root, { id }) => {
            const transaction = await prisma.purchase.findUniqueOrThrow({
                ...query,
                where: { id },
            });
            return transaction;
        },
    })
);
