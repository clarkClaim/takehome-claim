import { prisma } from '../../src/connectors/db';
import brands from './brand';
import campaigns from './campaign';
import users from './user';
import purchase from './purchase';
import claims from './claim';
import payouts from './payout';

const cleanDatabase = async () => {
    // Drop all data in reverse order of dependencies
    await prisma.payout.deleteMany({});
    await prisma.claim.deleteMany({});
    await prisma.purchase.deleteMany({});
    await prisma.campaign.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.brand.deleteMany({});
};

const seedDatabase = async () => {
    try {
        // First tier - independent tables
        await prisma.brand.createMany({ data: brands });
        await prisma.user.createMany({ data: users });

        // Second tier - depends on brands
        await prisma.campaign.createMany({ data: campaigns });
        await prisma.purchase.createMany({
            data: purchase,
        });

        // Third tier - depends on campaigns and users
        await prisma.claim.createMany({ data: claims });

        // Fourth tier - depends on claims and transactions
        const modifiedPayouts = payouts.map(({ purchase_id, ...rest }) => rest);
        await prisma.payout.createMany({ data: modifiedPayouts });

        await prisma.$executeRaw`SELECT setval('brand_id_seq', ${Math.max(
            ...brands.map((b) => b.id)
        )}, true)`;
        await prisma.$executeRaw`SELECT setval('campaign_id_seq', ${Math.max(
            ...campaigns.map((c) => c.id)
        )}, true)`;
        await prisma.$executeRaw`SELECT setval('purchase_id_seq', ${Math.max(
            ...purchase.map((t) => t.id)
        )}, true)`;
        await prisma.$executeRaw`SELECT setval('claim_id_seq', ${Math.max(
            ...claims.map((c) => c.id)
        )}, true)`;
        await prisma.$executeRaw`SELECT setval('payout_id_seq', ${Math.max(
            ...payouts.map((p) => p.id)
        )}, true)`;
    } catch (error) {
        console.error('Detailed seeding error:', error);
        throw error;
    }
};

const main = async () => {
    try {
        console.log('Cleaning database...');
        await cleanDatabase();

        console.log('Seeding database...');
        await seedDatabase();

        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error during seeding:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

main().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
