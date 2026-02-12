/*
  Warnings:

  - You are about to drop the column `generalScore` on the `Analysis` table. All the data in the column will be lost.
  - Added the required column `generalSentiment` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_productId_fkey";

-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "generalScore",
ADD COLUMN     "generalSentiment" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "topKeywords" TEXT[];

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
