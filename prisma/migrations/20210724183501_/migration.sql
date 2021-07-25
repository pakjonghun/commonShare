/*
  Warnings:

  - The `mapy` column on the `AllLists` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AllLists" DROP COLUMN "mapy",
ADD COLUMN     "mapy" DOUBLE PRECISION;
