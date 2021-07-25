/*
  Warnings:

  - Changed the type of `rnum` on the `CategoryCode` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AreaCode" ALTER COLUMN "code" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "CategoryCode" DROP COLUMN "rnum",
ADD COLUMN     "rnum" INTEGER NOT NULL;
