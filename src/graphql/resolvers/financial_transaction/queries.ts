import { builder } from '../../schema/builder';
import {
    FinancialTransactionWhereInput,
    FinancialTransactionOrderByInput,
} from './inputs';
import { prisma } from '../../../connectors/db';
import { removeNullsFromType } from '../../../utils';

builder.queryField('financial_transaction', (t) =>
    t.prismaField({
        type: ['financial_transaction'],
        args: {
            where: t.arg({ type: FinancialTransactionWhereInput }),
            orderBy: t.arg({ type: FinancialTransactionOrderByInput }),
            limit: t.arg.int(),
            offset: t.arg.int(),
        },
        resolve: async (query, root, args) => {
            const where = removeNullsFromType(args.where);
            const orderBy = removeNullsFromType(args.orderBy);
            return await prisma.financial_transaction.findMany({
                ...query,
                take: args?.limit || undefined,
                skip: args?.offset || undefined,
                where: where || undefined,
                orderBy: orderBy || undefined,
            });
        },
    })
);

builder.queryField('financial_transaction_by_pk', (t) =>
    t.prismaField({
        description: 'Get a financial transaction by its primary key',
        type: 'financial_transaction',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: async (query, root, { id }) => {
            const transaction =
                await prisma.financial_transaction.findUniqueOrThrow({
                    ...query,
                    where: { id },
                });
            return transaction;
        },
    })
);
