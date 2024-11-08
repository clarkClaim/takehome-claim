import { DateTime } from 'luxon';

const now = DateTime.now();
const sixDaysAgo = now.minus({ days: 6 });

export default [
  // Ali's claims
  {
    id: 1,
    campaign_id: 1,
    owner_id: "ali",
    created_at: sixDaysAgo.toJSDate(),
    updated_at: sixDaysAgo.toJSDate(),
    expires_at: now.plus({ days: 1 }).toJSDate(),
    value: 10.0

  },
  {
    id: 2,
    campaign_id: 2,
    owner_id: "ali",
    created_at: now.toJSDate(),
    updated_at: now.toJSDate(),
    expires_at: now.plus({ days: 7 }).toJSDate(),
    value: 5.0
  },
  // Bo's claims
  {
    id: 3,
    campaign_id: 1,
    owner_id: "bo",
    created_at: sixDaysAgo.toJSDate(),
    updated_at: sixDaysAgo.toJSDate(),
    expires_at: now.plus({ days: 1 }).toJSDate(),
    value: 10.0
  },
  {
    id: 4,
    campaign_id: 2,
    owner_id: "bo",
    created_at: now.toJSDate(),
    updated_at: now.toJSDate(),
    expires_at: now.plus({ days: 7 }).toJSDate(),
    value: 5.0
  },
];
