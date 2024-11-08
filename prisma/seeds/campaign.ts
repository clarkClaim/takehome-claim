import { DateTime } from 'luxon';

const now = DateTime.now();
const oneWeekAgo = now.minus({ days: 7 });

export default [
  {
    id: 1,
    brand_id: 1,
    name: "Salad Sweetness",
    value: 10.00,
    created_at: oneWeekAgo.toJSDate(),
    updated_at: oneWeekAgo.toJSDate(),
  },
  {
    id: 2,
    brand_id: 2,
    name: "Burrito Bliss",
    value: 5.00,
    created_at: oneWeekAgo.toJSDate(),
    updated_at: oneWeekAgo.toJSDate(),
  },
]; 