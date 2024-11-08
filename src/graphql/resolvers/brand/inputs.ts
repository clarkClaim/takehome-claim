import { builder } from '../../schema/builder';
import type { Prisma } from '@prisma/client';

export const BrandWhereInput = builder
    .inputRef<Prisma.brandWhereInput>('BrandWhereInput')
    .implement({
        fields: (t) => ({
            id: t.int(),
            name: t.string(),
            AND: t.field({ type: [BrandWhereInput] }),
            OR: t.field({ type: [BrandWhereInput] }),
        }),
    });

export const BrandWhereUniqueInput = builder
    .inputRef<Prisma.brandWhereUniqueInput>('BrandWhereUniqueInput')
    .implement({
        fields: (t) => ({
            id: t.int(),
        }),
    });

export const BrandOrderByInput = builder
    .inputRef<Prisma.brandOrderByWithRelationInput>('BrandOrderByInput')
    .implement({
        fields: (t) => ({
            created_at: t.field({ type: 'SortOrder' }),
            name: t.field({ type: 'SortOrder' }),
        }),
    });

export const BrandCreateInput = builder
    .inputRef<Prisma.brandUncheckedCreateInput>('BrandCreateInput')
    .implement({
        fields: (t) => ({
            name: t.string({ required: true }),
        }),
    });
