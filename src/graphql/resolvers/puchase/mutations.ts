import { builder } from '../../schema/builder';
import { prisma } from '../../../connectors/db';
import { PurchaseCreateInput } from './inputs';
import { removeNullsFromType } from '../../../utils';

builder.mutationField('insert_purchase_one', (t) =>
    t.prismaField({
        type: 'purchase',
        args: {
            data: t.arg({
                type: PurchaseCreateInput,
                required: true,
            }),
        },
        resolve: async (query, root, args) => {
            return await prisma.purchase.create({
                ...query,
                data: removeNullsFromType(args.data),
            });
        },
    })
);
