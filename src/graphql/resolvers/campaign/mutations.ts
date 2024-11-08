import { builder } from '../../schema/builder';
import { prisma } from '../../../connectors/db';
import { CampaignCreateInput } from './inputs';
import { removeNullsFromType } from '../../../utils';

builder.mutationField('insert_campaign_one', (t) =>
    t.prismaField({
        type: 'campaign',
        args: {
            data: t.arg({ type: CampaignCreateInput, required: true }),
        },
        resolve: async (query, root, args) => {
            return await prisma.campaign.create({
                ...query,
                data: removeNullsFromType(args.data),
            });
        },
    })
);
