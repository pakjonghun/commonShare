/*
  Warnings:

  - You are about to drop the column `allergyId` on the `Icecream` table. All the data in the column will be lost.
  - Added the required column `icecreamId` to the `Allergy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Icecream" DROP CONSTRAINT "Icecream_allergyId_fkey";

-- AlterTable
ALTER TABLE "Allergy" ADD COLUMN     "icecreamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Icecream" DROP COLUMN "allergyId";

-- AddForeignKey
ALTER TABLE "Allergy" ADD FOREIGN KEY ("icecreamId") REFERENCES "Icecream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
