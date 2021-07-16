/*
  Warnings:

  - You are about to drop the column `allergy` on the `Icecream` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Icecream" DROP COLUMN "allergy";

-- CreateTable
CREATE TABLE "Allergy" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "allergy" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AllergyToIcecream" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Allergy.allergy_unique" ON "Allergy"("allergy");

-- CreateIndex
CREATE UNIQUE INDEX "_AllergyToIcecream_AB_unique" ON "_AllergyToIcecream"("A", "B");

-- CreateIndex
CREATE INDEX "_AllergyToIcecream_B_index" ON "_AllergyToIcecream"("B");

-- AddForeignKey
ALTER TABLE "_AllergyToIcecream" ADD FOREIGN KEY ("A") REFERENCES "Allergy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllergyToIcecream" ADD FOREIGN KEY ("B") REFERENCES "Icecream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
