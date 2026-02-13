/*
  Warnings:

  - The values [male,female,other] on the enum `UserGender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserGender_new" AS ENUM ('MALE', 'FEMALE', 'OTHER');
ALTER TYPE "UserGender" RENAME TO "UserGender_old";
ALTER TYPE "UserGender_new" RENAME TO "UserGender";
DROP TYPE "public"."UserGender_old";
COMMIT;

-- DropEnum
DROP TYPE "Role";
