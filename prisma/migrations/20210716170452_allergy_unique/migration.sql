/*
  Warnings:

  - A unique constraint covering the columns `[allergy]` on the table `Allergy` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Allergy" ALTER COLUMN "allergy" SET NOT NULL,
ALTER COLUMN "allergy" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Allergy.allergy_unique" ON "Allergy"("allergy");
