import { DateTime } from 'luxon';
import { purchase_status } from '@prisma/client';

const now = DateTime.now();
const threeHoursAgo = now.minus({ hours: 3 });
const sevenDaysAgo = now.minus({ days: 7 });

export default [
    // Ali's transaction for Sweetgreen campaign
    {
        id: 1,
        user_id: 'ali',
        brand_id: 3, // Sweetgreen
        amount: 18.0,
        date: threeHoursAgo.toJSDate(),
        status: purchase_status.SETTLED,
    },
    // Bo's transaction for Chipotle campaign
    {
        id: 2,
        user_id: 'bo',
        brand_id: 2, // Chipotle
        amount: 12.0,
        date: threeHoursAgo.toJSDate(),
        status: purchase_status.SETTLED,
    },
    // Historical transactions for Ali
    {
        id: 3,
        user_id: 'ali',
        brand_id: 4, // Starbucks
        amount: 15.0,
        date: sevenDaysAgo.minus({ days: 1 }).toJSDate(),
        status: purchase_status.SETTLED,
    },
    {
        id: 4,
        user_id: 'ali',
        brand_id: 1, // Nike
        amount: 120.0,
        date: sevenDaysAgo.minus({ days: 3 }).toJSDate(),
        status: purchase_status.SETTLED,
    },
    {
        id: 5,
        user_id: 'ali',
        brand_id: 2, // Chipotle
        amount: 25.0,
        date: sevenDaysAgo.minus({ days: 5 }).toJSDate(),
        status: purchase_status.SETTLED,
    },
    {
        id: 6,
        user_id: 'ali',
        brand_id: 4, // Starbucks
        amount: 18.5,
        date: sevenDaysAgo.minus({ days: 7 }).toJSDate(),
        status: purchase_status.SETTLED,
    },
    // Historical transactions for Bo
    {
        id: 7,
        user_id: 'bo',
        brand_id: 4, // Starbucks
        amount: 12.75,
        date: sevenDaysAgo.minus({ days: 2 }).toJSDate(),
        status: purchase_status.SETTLED,
    },
    {
        id: 8,
        user_id: 'bo',
        brand_id: 1, // Nike
        amount: 95.0,
        date: sevenDaysAgo.minus({ days: 4 }).toJSDate(),
        status: purchase_status.SETTLED,
    },
    {
        id: 9,
        user_id: 'bo',
        brand_id: 3, // Sweetgreen
        amount: 22.5,
        date: sevenDaysAgo.minus({ days: 6 }).toJSDate(),
        status: purchase_status.SETTLED,
    },
    {
        id: 10,
        user_id: 'bo',
        brand_id: 4, // Starbucks
        amount: 16.25,
        date: sevenDaysAgo.minus({ days: 8 }).toJSDate(),
        status: purchase_status.SETTLED,
    },
];
