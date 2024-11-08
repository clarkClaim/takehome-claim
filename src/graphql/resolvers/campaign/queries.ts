import { builder } from '../../schema/builder';
import { CampaignWhereInput, CampaignOrderByInput } from './inputs';
import { prisma } from '../../../connectors/db';
import { removeNullsFromType } from '../../../utils';

builder.queryField('campaign', (t) =>
    t.prismaField({
        type: ['campaign'],
        args: {
            where: t.arg({ type: CampaignWhereInput }),
            orderBy: t.arg({ type: CampaignOrderByInput }),
            limit: t.arg.int(),
            offset: t.arg.int(),
        },
        resolve: async (query, root, args) => {
            const where = removeNullsFromType(args.where);
            const orderBy = removeNullsFromType(args.orderBy);
            return await prisma.campaign.findMany({
                ...query,
                take: args?.limit || undefined,
                skip: args?.offset || undefined,
                where: where || undefined,
                orderBy: orderBy || undefined,
            });
        },
    })
);

builder.queryField('campaign_by_pk', (t) =>
    t.prismaField({
        description: 'Get a campaign by its primary key',
        type: 'campaign',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: async (query, root, { id }) => {
            const campaign = await prisma.campaign.findUniqueOrThrow({
                ...query,
                where: { id },
            });
            return campaign;
        },
    })
);
