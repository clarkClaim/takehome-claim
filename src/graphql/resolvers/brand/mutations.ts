import { builder } from '../../schema/builder';
import { prisma } from '../../../connectors/db';
import { BrandCreateInput } from './inputs';
import { removeNullsFromType } from '../../../utils';

builder.mutationField('insert_brand_one', (t) =>
    t.prismaField({
        type: 'brand',
        args: {
            data: t.arg({ type: BrandCreateInput, required: true }),
        },
        resolve: async (query, root, args) => {
            return await prisma.brand.create({
                ...query,
                data: removeNullsFromType(args.data),
            });
        },
    })
);
