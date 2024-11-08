import { builder } from '../../schema/builder';
import { BrandWhereInput, BrandOrderByInput } from './inputs';
import { prisma } from '../../../connectors/db';
import { removeNullsFromType } from '../../../utils';

builder.queryField('brand', (t) =>
    t.prismaField({
        type: ['brand'],
        args: {
            where: t.arg({ type: BrandWhereInput }),
            orderBy: t.arg({ type: BrandOrderByInput }),
            limit: t.arg.int(),
            offset: t.arg.int(),
        },
        resolve: async (query, root, args) => {
            const where = removeNullsFromType(args.where);
            const orderBy = removeNullsFromType(args.orderBy);
            return await prisma.brand.findMany({
                ...query,
                take: args?.limit || undefined,
                skip: args?.offset || undefined,
                where: where || undefined,
                orderBy: orderBy || undefined,
            });
        },
    })
);

builder.queryField('brand_by_pk', (t) =>
    t.prismaField({
        description: 'Get a brand by its primary key',
        type: 'brand',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: async (query, root, { id }) => {
            const brand = await prisma.brand.findUniqueOrThrow({
                ...query,
                where: { id },
            });
            return brand;
        },
    })
);
