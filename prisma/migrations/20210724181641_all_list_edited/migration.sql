/*
  Warnings:

  - Changed the type of `zipcode` on the `AllLists` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AllLists" ALTER COLUMN "mapx" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "mapy" SET DATA TYPE TEXT,
DROP COLUMN "zipcode",
ADD COLUMN     "zipcode" INTEGER NOT NULL;
