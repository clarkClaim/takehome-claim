import { builder } from '../../schema/builder';

builder.prismaObject('campaign', {
    fields: (t) => ({
        id: t.exposeID('id'),
        brand_id: t.exposeInt('brand_id'),
        name: t.exposeString('name'),
        value: t.expose('value', { type: 'Decimal' }),
        created_at: t.expose('created_at', { type: 'DateTime' }),
        updated_at: t.expose('updated_at', { type: 'DateTime' }),
        brand: t.relation('brand'),
        claims: t.relation('claim'),
    }),
});
