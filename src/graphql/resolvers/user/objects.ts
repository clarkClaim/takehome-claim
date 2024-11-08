import { builder } from '../../schema/builder';
import { prisma } from '../../../connectors/db/index';
import luxon from 'luxon';

builder.prismaObject('user', {
    fields: (t) => ({
        id: t.exposeID('id'),
        phone_number: t.exposeString('phone_number'),
        email: t.exposeString('email'),
        name: t.exposeString('name'),
        created_at: t.expose('created_at', { type: 'DateTime' }),
        updated_at: t.expose('updated_at', { type: 'DateTime' }),
        financial_transactions: t.relation('financial_transaction'),
        payouts: t.relation('payout'),
        owned_claims: t.relation('claim'),
        active_claims: t.prismaField({
            type: ['claim'],
            resolve: async (query, user, args) => {
                const now = luxon.DateTime.now().toJSDate();
                return await prisma.claim.findMany({
                    ...query,
                    where: {
                        owner_id: user.id,
                        expires_at: { gt: now },
                        payout: { is: null },
                    },
                });
            },
        }),
        expired_claims: t.prismaField({
            type: ['claim'],
            resolve: async (query, user, args) => {
                const now = luxon.DateTime.now().toJSDate();
                return await prisma.claim.findMany({
                    ...query,
                    where: {
                        owner_id: user.id,
                        expires_at: { lt: now },
                        payout: { is: null },
                    },
                });
            },
        }),
    }),
});
