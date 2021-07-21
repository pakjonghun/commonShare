/*
  Warnings:

  - Changed the type of `pointX` on the `Markets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pointY` on the `Markets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Markets" DROP COLUMN "pointX",
ADD COLUMN     "pointX" DOUBLE PRECISION NOT NULL,
DROP COLUMN "pointY",
ADD COLUMN     "pointY" DOUBLE PRECISION NOT NULL;
