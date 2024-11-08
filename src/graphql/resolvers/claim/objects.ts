import { builder } from '../../schema/builder';

builder.prismaObject('claim', {
    fields: (t) => ({
        id: t.exposeID('id'),
        campaign_id: t.exposeInt('campaign_id'),
        created_at: t.expose('created_at', { type: 'DateTime' }),
        updated_at: t.expose('updated_at', { type: 'DateTime' }),
        expires_at: t.expose('expires_at', { type: 'DateTime' }),
        owner_id: t.exposeString('owner_id'),
        campaign: t.relation('campaign'),
        owner: t.relation('owner'),
        payout: t.relation('payout', { nullable: true }),
    }),
});
