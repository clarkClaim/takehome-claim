import { builder } from '../../schema/builder';
import { payout_status } from '@prisma/client';

builder.prismaObject('payout', {
    fields: (t) => ({
        id: t.exposeID('id'),
        user_id: t.exposeString('user_id'),
        claim_id: t.exposeInt('claim_id'),
        amount: t.expose('amount', { type: 'Decimal' }),
        status: t.expose('status', { type: payout_status }),
        financial_transaction_id: t.exposeInt('financial_transaction_id', { nullable: true }),
        created_at: t.expose('created_at', { type: 'DateTime' }),
        updated_at: t.expose('updated_at', { type: 'DateTime' }),
        settled_at: t.expose('settled_at', {
            type: 'DateTime',
            nullable: true,
        }),
        user: t.relation('user'),
        claim: t.relation('claim'),
        financial_transaction: t.relation('financial_transaction', { nullable: true }),
    }),
});
