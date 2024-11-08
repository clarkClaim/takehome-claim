import { builder } from './builder';
import { Prisma } from '@prisma/client';

const QueryMode = builder.enumType(Prisma.QueryMode, {
    name: 'QueryMode',
});

export const StringFilterInput = builder
    .inputRef<Prisma.StringFilter>('StringFilterInput')
    .implement({
        fields: (t) => ({
            equals: t.string(),
            in: t.stringList(),
            notIn: t.stringList(),
            lt: t.string(),
            lte: t.string(),
            gt: t.string(),
            gte: t.string(),
            contains: t.string(),
            startsWith: t.string(),
            endsWith: t.string(),
            not: t.string(),
            mode: t.field({ type: QueryMode }),
        }),
    });

export const IntFilterInput = builder
    .inputRef<Prisma.IntFilter>('IntFilterInput')
    .implement({
        fields: (t) => ({
            equals: t.int(),
            in: t.intList(),
            notIn: t.intList(),
            lt: t.int(),
            lte: t.int(),
            gt: t.int(),
            gte: t.int(),
            not: t.int(),
        }),
    });

export const DecimalFilterInput = builder
    .inputRef<Prisma.DecimalFilter>('DecimalFilterInput')
    .implement({
        fields: (t) => ({
            equals: t.float(),
            in: t.floatList(),
            notIn: t.floatList(),
            lt: t.float(),
            lte: t.float(),
            gt: t.float(),
            gte: t.float(),
            not: t.float(),
        }),
    });

export const DateTimeFilterInput = builder
    .inputRef<Prisma.DateTimeFilter>('DateTimeFilterInput')
    .implement({
        fields: (t) => ({
            lt: t.field({ type: 'DateTime' }),
            lte: t.field({ type: 'DateTime' }),
            gt: t.field({ type: 'DateTime' }),
            gte: t.field({ type: 'DateTime' }),
            equals: t.field({ type: 'DateTime' }),
            not: t.field({ type: 'DateTime' }),
        }),
    });

// export const BoolFilterInput = builder
//     .inputRef<Prisma.BoolFilter>('BoolFilterInput')
//     .implement({
//         fields: (t) => ({
//             equals: t.boolean(),
//         }),
//     });

export const SortOrderInput = builder
    .inputRef<Prisma.SortOrderInput>('SortOrderInput')
    .implement({
        fields: (t) => ({
            sort: t.field({ type: 'SortOrder', required: true }),
            nulls: t.field({ type: 'NullsOrder' }),
        }),
    });
