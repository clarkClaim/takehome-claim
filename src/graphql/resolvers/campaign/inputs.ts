import { builder } from '../../schema/builder';
import type { Prisma } from '@prisma/client';

export const CampaignWhereInput = builder
    .inputRef<Prisma.campaignWhereInput>('CampaignWhereInput')
    .implement({
        fields: (t) => ({
            id: t.int(),
            brand_id: t.int(),
            name: t.string(),
            value: t.field({ type: 'Decimal' }),
            AND: t.field({ type: [CampaignWhereInput] }),
            OR: t.field({ type: [CampaignWhereInput] }),
        }),
    });

export const CampaignWhereUniqueInput = builder
    .inputRef<Prisma.campaignWhereUniqueInput>('CampaignWhereUniqueInput')
    .implement({
        fields: (t) => ({
            id: t.int(),
        }),
    });

export const CampaignOrderByInput = builder
    .inputRef<Prisma.campaignOrderByWithRelationInput>('CampaignOrderByInput')
    .implement({
        fields: (t) => ({
            created_at: t.field({ type: 'SortOrder' }),
            name: t.field({ type: 'SortOrder' }),
            value: t.field({ type: 'SortOrder' }),
        }),
    });

export const CampaignCreateInput = builder
    .inputRef<Prisma.campaignUncheckedCreateInput>('CampaignCreateInput')
    .implement({
        fields: (t) => ({
            brand_id: t.int({ required: true }),
            name: t.string({ required: true }),
            value: t.field({ type: 'Decimal', required: true }),
        }),
    });
