/*
  Warnings:

  - You are about to drop the column `icecreamId` on the `Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,IcecreamTitle]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_icecreamId_fkey";

-- DropIndex
DROP INDEX "Like.userId_icecreamId_unique";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "icecreamId",
ADD COLUMN     "IcecreamTitle" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Like.userId_IcecreamTitle_unique" ON "Like"("userId", "IcecreamTitle");

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("IcecreamTitle") REFERENCES "Icecream"("title") ON DELETE SET NULL ON UPDATE CASCADE;
