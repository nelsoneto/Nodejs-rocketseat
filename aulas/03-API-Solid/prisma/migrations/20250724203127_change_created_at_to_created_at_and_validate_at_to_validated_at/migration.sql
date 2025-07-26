/*
  Warnings:

  - You are about to drop the column `createdAt` on the `check_ins` table. All the data in the column will be lost.
  - You are about to drop the column `validated` on the `check_ins` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "createdAt",
DROP COLUMN "validated",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "validated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
