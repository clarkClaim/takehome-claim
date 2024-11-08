import { builder } from '../../schema/builder';
import type { Prisma } from '@prisma/client';

export const ClaimWhereInput = builder
    .inputRef<Prisma.claimWhereInput>('ClaimWhereInput')
    .implement({
        fields: (t) => ({
            id: t.int(),
            campaign_id: t.int(),
            owner_id: t.string(),
            expires_at: t.field({ type: 'DateTime' }),
            AND: t.field({ type: [ClaimWhereInput] }),
            OR: t.field({ type: [ClaimWhereInput] }),
        }),
    });

export const ClaimWhereUniqueInput = builder
    .inputRef<Prisma.claimWhereUniqueInput>('ClaimWhereUniqueInput')
    .implement({
        fields: (t) => ({
            id: t.int(),
        }),
    });

export const ClaimOrderByInput = builder
    .inputRef<Prisma.claimOrderByWithRelationInput>('ClaimOrderByInput')
    .implement({
        fields: (t) => ({
            created_at: t.field({ type: 'SortOrder' }),
            expires_at: t.field({ type: 'SortOrder' }),
        }),
    });

export const ClaimCreateInput = builder
    .inputRef<Prisma.claimUncheckedCreateInput>('ClaimCreateInput')
    .implement({
        fields: (t) => ({
            campaign_id: t.int({ required: true }),
            owner_id: t.string({ required: true }),
        }),
    });
