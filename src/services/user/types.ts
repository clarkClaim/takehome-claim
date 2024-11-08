import { DateTime } from 'luxon';

export const activeClaimsWhere = {
    expires_at: { gt: DateTime.now().toJSDate() },
    payout: { is: null }
};

export const expiredClaimsWhere = {
    expires_at: { lt: DateTime.now().toJSDate() },
    payout: { is: null }
};

export const redeemedClaimsWhere = {
    payout: { isNot: null }
};

export const activeClaimsInclude = {
    where: activeClaimsWhere,
    include: {
        campaign: {
            include: {
                brand: true
            }
        }
    }
};

