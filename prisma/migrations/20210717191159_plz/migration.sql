/*
  Warnings:

  - You are about to drop the column `newId` on the `Icecream` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Icecream.newId_unique";

-- AlterTable
ALTER TABLE "Icecream" DROP COLUMN "newId";
