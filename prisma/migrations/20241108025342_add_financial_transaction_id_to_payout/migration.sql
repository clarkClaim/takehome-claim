/*
  Warnings:

  - A unique constraint covering the columns `[financial_transaction_id]` on the table `payout` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "payout" ADD COLUMN     "financial_transaction_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "payout_financial_transaction_id_key" ON "payout"("financial_transaction_id");

-- AddForeignKey
ALTER TABLE "payout" ADD CONSTRAINT "payout_financial_transaction_id_fkey" FOREIGN KEY ("financial_transaction_id") REFERENCES "financial_transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
