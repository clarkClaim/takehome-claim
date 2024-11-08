import { builder } from '../../schema/builder';

builder.prismaObject('brand', {
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        created_at: t.expose('created_at', { type: 'DateTime' }),
        updated_at: t.expose('updated_at', { type: 'DateTime' }),
        campaigns: t.relation('campaign'),
    }),
});
