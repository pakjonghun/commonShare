/*
  Warnings:

  - You are about to drop the column `icecreamId` on the `Allergy` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Allergy" DROP CONSTRAINT "Allergy_icecreamId_fkey";

-- AlterTable
ALTER TABLE "Allergy" DROP COLUMN "icecreamId";

-- AlterTable
ALTER TABLE "Icecream" ADD COLUMN     "allergyId" INTEGER,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Icecream" ADD FOREIGN KEY ("allergyId") REFERENCES "Allergy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
