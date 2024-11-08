import { builder } from '../../schema/builder';
import { prisma } from '../../../connectors/db';
import { ClaimCreateInput } from './inputs';
import { removeNullsFromType } from '../../../utils';

builder.mutationField('insert_claim_one', (t) =>
    t.prismaField({
        type: 'claim',
        args: {
            data: t.arg({ type: ClaimCreateInput, required: true }),
        },
        resolve: async (query, root, args) => {
            return await prisma.claim.create({
                ...query,
                data: removeNullsFromType(args.data),
            });
        },
    })
);
