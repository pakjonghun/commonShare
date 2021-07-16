/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Icecream` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Icecream.title_unique" ON "Icecream"("title");
