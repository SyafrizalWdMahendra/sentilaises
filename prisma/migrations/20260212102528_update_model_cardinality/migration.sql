/*
  Warnings:

  - The values [positive,negative,neutral] on the enum `Sentiment` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `reviewId` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `productReference` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `compatibilityScore` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generalScore` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetProfession` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verdict` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterEnum
BEGIN;
CREATE TYPE "Sentiment_new" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');
ALTER TABLE "Review" ALTER COLUMN "sentiment" TYPE "Sentiment_new" USING ("sentiment"::text::"Sentiment_new");
ALTER TYPE "Sentiment" RENAME TO "Sentiment_old";
ALTER TYPE "Sentiment_new" RENAME TO "Sentiment";
DROP TYPE "public"."Sentiment_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "reviewId",
DROP COLUMN "updatedAt",
ADD COLUMN     "compatibilityScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "generalScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "targetProfession" TEXT NOT NULL,
ADD COLUMN     "verdict" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "version" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" TEXT,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "brand" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "modelId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "productReference",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Product_url_key" ON "Product"("url");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
