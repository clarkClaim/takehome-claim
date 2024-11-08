import { Prisma, financial_transaction_status } from '@prisma/client';
import { builder } from '../../schema/builder';

export const FinancialTransactionStatusEnum = builder.enumType(
    financial_transaction_status,
    {
        name: 'financial_transaction_status',
    }
);

export const FinancialTransactionStatusEnumFilterInput = builder
    .inputRef<Prisma.Enumfinancial_transaction_statusFilter>(
        'FinancialTransactionStatusEnumFilterInput'
    )
    .implement({
        fields: (t) => ({
            equals: t.field({ type: financial_transaction_status }),
            in: t.field({ type: [financial_transaction_status] }),
            notIn: t.field({ type: [financial_transaction_status] }),
            not: t.field({ type: financial_transaction_status }),
        }),
    });
