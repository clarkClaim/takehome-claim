/*
  Warnings:

  - You are about to drop the column `financial_transaction_id` on the `payout` table. All the data in the column will be lost.
  - You are about to drop the `financial_transaction` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[purchase_id]` on the table `payout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "purchase_status" AS ENUM ('PENDING', 'SETTLED');

-- DropForeignKey
ALTER TABLE "financial_transaction" DROP CONSTRAINT "financial_transaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "payout" DROP CONSTRAINT "payout_financial_transaction_id_fkey";

-- DropIndex
DROP INDEX "payout_financial_transaction_id_key";

-- AlterTable
ALTER TABLE "payout" DROP COLUMN "financial_transaction_id",
ADD COLUMN     "purchase_id" INTEGER;

-- DropTable
DROP TABLE "financial_transaction";

-- DropEnum
DROP TYPE "financial_transaction_status";

-- CreateTable
CREATE TABLE "purchase" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "date" DATE NOT NULL,
    "status" "purchase_status" NOT NULL,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payout_purchase_id_key" ON "payout"("purchase_id");

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payout" ADD CONSTRAINT "payout_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
