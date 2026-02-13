/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OS" AS ENUM ('WINDOWS', 'MACOS', 'LINUX', 'CHROME_OS', 'OTHER');

-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('APPLE', 'ASUS', 'ACER', 'LENOVO', 'HP', 'DELL', 'MSI', 'AXIOO', 'ADVAN', 'ZYREX', 'OTHER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "location" TEXT;

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" SERIAL NOT NULL,
    "profession" TEXT,
    "preferredOS" "OS",
    "preferedBrand" "Brand",
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
