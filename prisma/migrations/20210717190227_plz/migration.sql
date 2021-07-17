/*
  Warnings:

  - A unique constraint covering the columns `[newId]` on the table `Icecream` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Icecream" ADD COLUMN     "newId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Icecream.newId_unique" ON "Icecream"("newId");
