import { builder } from '../../schema/builder';
import { ClaimWhereInput, ClaimOrderByInput } from './inputs';
import { prisma } from '../../../connectors/db';
import { removeNullsFromType } from '../../../utils';

builder.queryField('claim', (t) =>
    t.prismaField({
        type: ['claim'],
        args: {
            where: t.arg({ type: ClaimWhereInput }),
            orderBy: t.arg({ type: ClaimOrderByInput }),
            limit: t.arg.int(),
            offset: t.arg.int(),
        },
        resolve: async (query, root, args) => {
            const where = removeNullsFromType(args.where);
            const orderBy = removeNullsFromType(args.orderBy);
            return await prisma.claim.findMany({
                ...query,
                take: args?.limit || undefined,
                skip: args?.offset || undefined,
                where: where || undefined,
                orderBy: orderBy || undefined,
            });
        },
    })
);

builder.queryField('claim_by_pk', (t) =>
    t.prismaField({
        description: 'Get a claim by its primary key',
        type: 'claim',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: async (query, root, { id }) => {
            const claim = await prisma.claim.findUniqueOrThrow({
                ...query,
                where: { id },
            });
            return claim;
        },
    })
);
