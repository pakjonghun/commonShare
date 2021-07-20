/*
  Warnings:

  - You are about to drop the column `description` on the `Notice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL DEFAULT E'';
