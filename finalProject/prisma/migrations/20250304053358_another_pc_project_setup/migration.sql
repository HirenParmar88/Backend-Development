/*
  Warnings:

  - You are about to drop the column `userId` on the `accessories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "accessories" DROP CONSTRAINT "accessories_userId_fkey";

-- AlterTable
ALTER TABLE "accessories" DROP COLUMN "userId";
