/*
  Warnings:

  - You are about to drop the column `preferedBrand` on the `UserPreference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "preferedBrand",
ADD COLUMN     "preferredBrand" "Brand";
