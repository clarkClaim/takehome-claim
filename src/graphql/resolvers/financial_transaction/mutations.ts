import { builder } from '../../schema/builder';
import { prisma } from '../../../connectors/db';
import { FinancialTransactionCreateInput } from './inputs';
import { removeNullsFromType } from '../../../utils';

builder.mutationField('insert_financial_transaction_one', (t) =>
    t.prismaField({
        type: 'financial_transaction',
        args: {
            data: t.arg({
                type: FinancialTransactionCreateInput,
                required: true,
            }),
        },
        resolve: async (query, root, args) => {
            return await prisma.financial_transaction.create({
                ...query,
                data: removeNullsFromType(args.data),
            });
        },
    })
);
