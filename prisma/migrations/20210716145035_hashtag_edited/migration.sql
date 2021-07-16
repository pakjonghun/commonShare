/*
  Warnings:

  - Added the required column `hashtag` to the `HashTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HashTag" ADD COLUMN     "hashtag" TEXT NOT NULL;
