import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const PRIMARY_DATABASE_URL = process.env.DATABASE_URL;
export const prisma = new PrismaClient({
    datasourceUrl: PRIMARY_DATABASE_URL,
});
