import { Prisma } from '@prisma/client';
import { activeClaimsInclude } from '../user/types';

export const userRedemptionContextInclude = {
    include: {
        claims: activeClaimsInclude,
        financial_transactions: {
            where: {
                payout: { is: null },
            },
        },
    },
};

const userRedemptionContext = Prisma.validator<Prisma.userDefaultArgs>()(
    userRedemptionContextInclude
);

export type UserRedemptionContext = Prisma.userGetPayload<
    typeof userRedemptionContext
>;
