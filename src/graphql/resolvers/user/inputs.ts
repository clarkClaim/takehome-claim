import { builder } from '../../schema/builder';
import type { Prisma } from '@prisma/client';

export const UserWhereInput = builder
    .inputRef<Prisma.userWhereInput>('UserWhereInput')
    .implement({
        fields: (t) => ({
            id: t.string(),
            phone_number: t.string(),
            email: t.string(),
            AND: t.field({ type: [UserWhereInput] }),
            OR: t.field({ type: [UserWhereInput] }),
        }),
    });

export const UserWhereUniqueInput = builder
    .inputRef<Prisma.userWhereUniqueInput>('UserWhereUniqueInput')
    .implement({
        fields: (t) => ({
            id: t.string(),
            phone_number: t.string(),
        }),
    });

export const UserOrderByInput = builder
    .inputRef<Prisma.userOrderByWithRelationInput>('UserOrderByInput')
    .implement({
        fields: (t) => ({
            created_at: t.field({ type: 'SortOrder' }),
        }),
    });

export const UserCreateInput = builder
    .inputRef<Prisma.userUncheckedCreateInput>('UserCreateInput')
    .implement({
        fields: (t) => ({
            email: t.string({ required: true }),
            name: t.string({ required: true }),
            phone_number: t.string({ required: true }),
            id: t.string({ required: true }),
        }),
    });
