/*
  Warnings:

  - The values [PENDING] on the enum `payout_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `value` to the `claim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "payout_status_new" AS ENUM ('APPROVED', 'PROCESSING', 'SETTLED', 'FAILED');
ALTER TABLE "payout" ALTER COLUMN "status" TYPE "payout_status_new" USING ("status"::text::"payout_status_new");
ALTER TYPE "payout_status" RENAME TO "payout_status_old";
ALTER TYPE "payout_status_new" RENAME TO "payout_status";
DROP TYPE "payout_status_old";
COMMIT;

-- AlterTable
ALTER TABLE "claim" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;
