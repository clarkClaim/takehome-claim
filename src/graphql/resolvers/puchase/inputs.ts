import { builder } from '../../schema/builder';
import type { Prisma } from '@prisma/client';
import { PurchaseStatusEnumFilterInput, PurchaseStatusEnum } from './enums';

export const PurchaseWhereInput = builder
    .inputRef<Prisma.purchaseWhereInput>('PurchaseWhereInput')
    .implement({
        fields: (t) => ({
            id: t.int(),
            user_id: t.string(),
            brand_id: t.int(),
            amount: t.field({ type: 'Decimal' }),
            status: t.field({
                type: PurchaseStatusEnumFilterInput,
            }),
            AND: t.field({ type: [PurchaseWhereInput] }),
            OR: t.field({ type: [PurchaseWhereInput] }),
        }),
    });

export const PurchaseWhereUniqueInput = builder
    .inputRef<Prisma.purchaseWhereUniqueInput>('PurchaseWhereUniqueInput')
    .implement({
        fields: (t) => ({
            id: t.int(),
        }),
    });

export const PurchaseOrderByInput = builder
    .inputRef<Prisma.purchaseOrderByWithRelationInput>('PurchaseOrderByInput')
    .implement({
        fields: (t) => ({
            date: t.field({ type: 'SortOrder' }),
            status: t.field({ type: 'SortOrder' }),
        }),
    });

export const PurchaseCreateInput = builder
    .inputRef<Prisma.purchaseUncheckedCreateInput>('PurchaseCreateInput')
    .implement({
        fields: (t) => ({
            user_id: t.string({ required: true }),
            brand_id: t.int({ required: true }),
            amount: t.field({ type: 'Decimal', required: true }),
            date: t.field({ type: 'DateTime', required: true }),
            status: t.field({
                type: PurchaseStatusEnum,
                required: true,
            }),
        }),
    });
