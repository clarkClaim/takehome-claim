import { Prisma, purchase_status } from '@prisma/client';
import { builder } from '../../schema/builder';

export const PurchaseStatusEnum = builder.enumType(purchase_status, {
    name: 'purchase_status',
});

export const PurchaseStatusEnumFilterInput = builder
    .inputRef<Prisma.Enumpurchase_statusFilter>('PurchaseStatusEnumFilterInput')
    .implement({
        fields: (t) => ({
            equals: t.field({ type: purchase_status }),
            in: t.field({ type: [purchase_status] }),
            notIn: t.field({ type: [purchase_status] }),
            not: t.field({ type: purchase_status }),
        }),
    });
