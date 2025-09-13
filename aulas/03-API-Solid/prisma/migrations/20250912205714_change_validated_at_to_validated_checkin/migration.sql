/*
  Warnings:

  - You are about to drop the column `validated_at` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "validated_at",
ADD COLUMN     "validated" TIMESTAMP(3);
