import { builder } from '../../schema/builder';
import type { Prisma } from '@prisma/client';
import { PayoutStatusEnumFilterInput, PayoutStatusEnum } from './enums';

export const PayoutWhereInput = builder
    .inputRef<Prisma.payoutWhereInput>('PayoutWhereInput')
    .implement({
        fields: (t) => ({
            id: t.int(),
            user_id: t.string(),
            claim_id: t.int(),
            amount: t.field({ type: 'Decimal' }),
            status: t.field({ type: PayoutStatusEnumFilterInput }),
            AND: t.field({ type: [PayoutWhereInput] }),
            OR: t.field({ type: [PayoutWhereInput] }),
        }),
    });

export const PayoutWhereUniqueInput = builder
    .inputRef<Prisma.payoutWhereUniqueInput>('PayoutWhereUniqueInput')
    .implement({
        fields: (t) => ({
            id: t.int(),
        }),
    });

export const PayoutOrderByInput = builder
    .inputRef<Prisma.payoutOrderByWithRelationInput>('PayoutOrderByInput')
    .implement({
        fields: (t) => ({
            created_at: t.field({ type: 'SortOrder' }),
            status: t.field({ type: 'SortOrder' }),
            settled_at: t.field({ type: 'SortOrder' }),
        }),
    });

export const PayoutCreateInput = builder
    .inputRef<Prisma.payoutUncheckedCreateInput>('PayoutCreateInput')
    .implement({
        fields: (t) => ({
            user_id: t.string({ required: true }),
            claim_id: t.int({ required: true }),
            status: t.field({ type: PayoutStatusEnum, required: true }),
            amount: t.field({ type: 'Decimal', required: true }),
        }),
    });
