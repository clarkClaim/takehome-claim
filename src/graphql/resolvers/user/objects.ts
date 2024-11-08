import { builder } from '../../schema/builder';
import { prisma } from '../../../connectors/db/index';
import * as User from '../../../services/user';

builder.prismaObject('user', {
    fields: (t) => ({
        id: t.exposeID('id'),
        phone_number: t.exposeString('phone_number'),
        email: t.exposeString('email'),
        name: t.exposeString('name'),
        created_at: t.expose('created_at', { type: 'DateTime' }),
        updated_at: t.expose('updated_at', { type: 'DateTime' }),
        financial_transactions: t.relation('financial_transactions'),
        payouts: t.relation('payouts'),
        owned_claims: t.relation('claims'),
        active_claims: t.prismaField({
            type: ['claim'],
            resolve: async (query, user) => {
                return await prisma.claim.findMany({
                    ...query,
                    where: {
                        owner_id: user.id,
                        ...User.types.activeClaimsWhere,
                    },
                });
            },
        }),
        expired_claims: t.prismaField({
            type: ['claim'],
            resolve: async (query, user) => {
                return await prisma.claim.findMany({
                    ...query,
                    where: {
                        owner_id: user.id,
                        ...User.types.expiredClaimsWhere,
                    },
                });
            },
        }),
        redeemed_claims: t.prismaField({
            type: ['claim'],
            resolve: async (query, user) => {
                return await prisma.claim.findMany({
                    ...query,
                    where: {
                        owner_id: user.id,
                        ...User.types.redeemedClaimsWhere,
                    },
                });
            },
        }),
    }),
});
