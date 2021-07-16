/*
  Warnings:

  - A unique constraint covering the columns `[allergy]` on the table `Allergy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Allergy.allergy_unique" ON "Allergy"("allergy");
