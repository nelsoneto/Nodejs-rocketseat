/*
  Warnings:

  - You are about to drop the column `created_at` on the `check_ins` table. All the data in the column will be lost.
  - You are about to drop the column `gym_id` on the `check_ins` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `check_ins` table. All the data in the column will be lost.
  - You are about to drop the column `validated_at` on the `check_ins` table. All the data in the column will be lost.
  - Added the required column `gymId` to the `check_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_gym_id_fkey";

-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_user_id_fkey";

-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "created_at",
DROP COLUMN "gym_id",
DROP COLUMN "user_id",
DROP COLUMN "validated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gymId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "validatedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
