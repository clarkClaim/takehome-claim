import { builder } from '../../schema/builder';
import { UserWhereInput, UserOrderByInput } from './inputs';
import { prisma } from '../../../connectors/db';
import { removeNullsFromType } from '../../../utils';

builder.queryField('user', (t) =>
    t.prismaField({
        type: ['user'],
        args: {
            where: t.arg({ type: UserWhereInput }),
            orderBy: t.arg({ type: UserOrderByInput }),
            limit: t.arg.int(),
            offset: t.arg.int(),
        },
        resolve: async (query, root, args) => {
            const where = removeNullsFromType(args.where);
            const orderBy = removeNullsFromType(args.orderBy);
            return await prisma.user.findMany({
                ...query,
                take: args?.limit || undefined,
                skip: args?.offset || undefined,
                where: where || undefined,
                orderBy: orderBy || undefined,
            });
        },
    })
);

builder.queryField('user_by_pk', (t) =>
    t.prismaField({
        description: 'Get a user by its primary key',
        type: 'user',
        args: {
            id: t.arg.string({ required: true }),
        },
        resolve: async (query, root, { id }) => {
            const user = await prisma.user.findUniqueOrThrow({
                ...query,
                where: { id },
            });
            return user;
        },
    })
);
