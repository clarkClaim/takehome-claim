import { builder } from '../../schema/builder';
import { purchase_status } from '@prisma/client';

builder.prismaObject('purchase', {
    fields: (t) => ({
        id: t.exposeID('id'),
        user_id: t.exposeString('user_id'),
        brand_id: t.exposeInt('brand_id'),
        amount: t.expose('amount', { type: 'Decimal' }),
        date: t.expose('date', { type: 'DateTime' }),
        status: t.expose('status', { type: purchase_status }),
        user: t.relation('user'),
        payout: t.relation('payout', { nullable: true }),
    }),
});
