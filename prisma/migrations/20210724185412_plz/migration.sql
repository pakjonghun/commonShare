/*
  Warnings:

  - A unique constraint covering the columns `[contentid]` on the table `AllLists` will be added. If there are existing duplicate values, this will fail.
  - Made the column `contentid` on table `AllLists` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AllLists" ADD COLUMN     "overView" TEXT,
ALTER COLUMN "contentid" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AllLists.contentid_unique" ON "AllLists"("contentid");
