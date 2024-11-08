import { builder } from '../../schema/builder';
import { prisma } from '../../../connectors/db';
import { UserCreateInput } from './inputs';
import { removeNullsFromType } from '../../../utils';

builder.mutationField('insert_user_one', (t) =>
    t.prismaField({
        type: 'user',
        args: {
            data: t.arg({ type: UserCreateInput, required: true }),
        },
        resolve: async (query, root, args) => {
            return await prisma.user.create({
                ...query,
                data: removeNullsFromType(args.data),
            });
        },
    })
);
