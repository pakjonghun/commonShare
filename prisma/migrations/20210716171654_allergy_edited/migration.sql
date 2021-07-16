/*
  Warnings:

  - You are about to drop the `_AllergyToIcecream` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AllergyToIcecream" DROP CONSTRAINT "_AllergyToIcecream_A_fkey";

-- DropForeignKey
ALTER TABLE "_AllergyToIcecream" DROP CONSTRAINT "_AllergyToIcecream_B_fkey";

-- AlterTable
ALTER TABLE "Icecream" ADD COLUMN     "allergyId" INTEGER;

-- DropTable
DROP TABLE "_AllergyToIcecream";

-- AddForeignKey
ALTER TABLE "Icecream" ADD FOREIGN KEY ("allergyId") REFERENCES "Allergy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
