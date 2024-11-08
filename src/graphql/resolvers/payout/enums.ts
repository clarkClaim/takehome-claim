import { Prisma, payout_status } from '@prisma/client';
import { builder } from '../../schema/builder';

export const PayoutStatusEnum = builder.enumType(payout_status, {
    name: 'payout_status',
});

export const PayoutStatusEnumFilterInput = builder
    .inputRef<Prisma.Enumpayout_statusFilter>('PayoutStatusEnumFilterInput')
    .implement({
        fields: (t) => ({
            equals: t.field({ type: payout_status }),
            in: t.field({ type: [payout_status] }),
            notIn: t.field({ type: [payout_status] }),
            not: t.field({ type: payout_status }),
        }),
    });
