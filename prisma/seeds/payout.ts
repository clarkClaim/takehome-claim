import { DateTime } from 'luxon';
import { payout_status } from '@prisma/client';

const now = DateTime.now();
const yesterday = now.minus({ days: 1 });

export default [
  {
    id: 1,
    user_id: "ali",
    claim_id: 2,
    financial_transaction_id: 1,
    amount: 10.00,
    status: payout_status.SETTLED,
    created_at: yesterday.toJSDate(),
    updated_at: yesterday.toJSDate(),
    settled_at: now.toJSDate(),
  },
  {
    id: 2,
    user_id: "bo",
    claim_id: 3,
    financial_transaction_id: 2,
    amount: 5.00,
    status: payout_status.SETTLED,
    created_at: yesterday.toJSDate(),
    updated_at: yesterday.toJSDate(),
    settled_at: now.toJSDate(),
  },
]; 