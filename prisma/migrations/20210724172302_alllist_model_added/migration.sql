/*
  Warnings:

  - You are about to drop the `Allergy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HashTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Icecream` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InstarPic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Markets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AllergyToIcecream` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HashTagToIcecream` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Icecream" DROP CONSTRAINT "Icecream_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_IcecreamTitle_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AllergyToIcecream" DROP CONSTRAINT "_AllergyToIcecream_A_fkey";

-- DropForeignKey
ALTER TABLE "_AllergyToIcecream" DROP CONSTRAINT "_AllergyToIcecream_B_fkey";

-- DropForeignKey
ALTER TABLE "_HashTagToIcecream" DROP CONSTRAINT "_HashTagToIcecream_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashTagToIcecream" DROP CONSTRAINT "_HashTagToIcecream_B_fkey";

-- DropTable
DROP TABLE "Allergy";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "HashTag";

-- DropTable
DROP TABLE "Icecream";

-- DropTable
DROP TABLE "InstarPic";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "Markets";

-- DropTable
DROP TABLE "Notice";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_AllergyToIcecream";

-- DropTable
DROP TABLE "_HashTagToIcecream";

-- CreateTable
CREATE TABLE "AllLists" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addr1" TEXT NOT NULL,
    "areacode" INTEGER NOT NULL,
    "cat1" TEXT NOT NULL,
    "cat2" TEXT NOT NULL,
    "cat3" TEXT NOT NULL,
    "contentid" INTEGER NOT NULL,
    "contenttypeid" INTEGER NOT NULL,
    "createdtime" INTEGER NOT NULL,
    "firstimage" TEXT NOT NULL,
    "firstimage2" TEXT NOT NULL,
    "mapx" INTEGER NOT NULL,
    "mapy" INTEGER NOT NULL,
    "mlevel" INTEGER NOT NULL,
    "modifiedtime" INTEGER NOT NULL,
    "readcount" INTEGER NOT NULL,
    "sigungucode" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
