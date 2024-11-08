import { builder } from '../../schema/builder';
import type { Prisma } from '@prisma/client';
import {
    FinancialTransactionStatusEnumFilterInput,
    FinancialTransactionStatusEnum,
} from './enums';

export const FinancialTransactionWhereInput = builder
    .inputRef<Prisma.financial_transactionWhereInput>(
        'FinancialTransactionWhereInput'
    )
    .implement({
        fields: (t) => ({
            id: t.int(),
            user_id: t.string(),
            brand_id: t.int(),
            amount: t.field({ type: 'Decimal' }),
            status: t.field({
                type: FinancialTransactionStatusEnumFilterInput,
            }),
            AND: t.field({ type: [FinancialTransactionWhereInput] }),
            OR: t.field({ type: [FinancialTransactionWhereInput] }),
        }),
    });

export const FinancialTransactionWhereUniqueInput = builder
    .inputRef<Prisma.financial_transactionWhereUniqueInput>(
        'FinancialTransactionWhereUniqueInput'
    )
    .implement({
        fields: (t) => ({
            id: t.int(),
        }),
    });

export const FinancialTransactionOrderByInput = builder
    .inputRef<Prisma.financial_transactionOrderByWithRelationInput>(
        'FinancialTransactionOrderByInput'
    )
    .implement({
        fields: (t) => ({
            date: t.field({ type: 'SortOrder' }),
            status: t.field({ type: 'SortOrder' }),
        }),
    });

export const FinancialTransactionCreateInput = builder
    .inputRef<Prisma.financial_transactionUncheckedCreateInput>(
        'FinancialTransactionCreateInput'
    )
    .implement({
        fields: (t) => ({
            user_id: t.string({ required: true }),
            brand_id: t.int({ required: true }),
            amount: t.field({ type: 'Decimal', required: true }),
            date: t.field({ type: 'DateTime', required: true }),
            status: t.field({
                type: FinancialTransactionStatusEnum,
                required: true,
            }),
        }),
    });
