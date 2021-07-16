/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "category" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category.category_unique" ON "Category"("category");
