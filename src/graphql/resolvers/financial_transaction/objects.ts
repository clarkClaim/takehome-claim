import { builder } from '../../schema/builder';
import { financial_transaction_status } from '@prisma/client';

builder.prismaObject('financial_transaction', {
    fields: (t) => ({
        id: t.exposeID('id'),
        user_id: t.exposeString('user_id'),
        brand_id: t.exposeInt('brand_id'),
        amount: t.expose('amount', { type: 'Decimal' }),
        date: t.expose('date', { type: 'DateTime' }),
        status: t.expose('status', { type: financial_transaction_status }),
        user: t.relation('user'),
        payout: t.relation('payout', { nullable: true }),
    }),
});
