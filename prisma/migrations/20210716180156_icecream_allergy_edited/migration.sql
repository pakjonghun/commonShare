/*
  Warnings:

  - You are about to drop the column `allergyId` on the `Icecream` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Icecream" DROP CONSTRAINT "Icecream_allergyId_fkey";

-- AlterTable
ALTER TABLE "Icecream" DROP COLUMN "allergyId";

-- CreateTable
CREATE TABLE "_AllergyToIcecream" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AllergyToIcecream_AB_unique" ON "_AllergyToIcecream"("A", "B");

-- CreateIndex
CREATE INDEX "_AllergyToIcecream_B_index" ON "_AllergyToIcecream"("B");

-- AddForeignKey
ALTER TABLE "_AllergyToIcecream" ADD FOREIGN KEY ("A") REFERENCES "Allergy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllergyToIcecream" ADD FOREIGN KEY ("B") REFERENCES "Icecream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
