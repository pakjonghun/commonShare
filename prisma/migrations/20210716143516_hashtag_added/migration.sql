-- CreateTable
CREATE TABLE "HashTag" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HashTagToIcecream" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HashTagToIcecream_AB_unique" ON "_HashTagToIcecream"("A", "B");

-- CreateIndex
CREATE INDEX "_HashTagToIcecream_B_index" ON "_HashTagToIcecream"("B");

-- AddForeignKey
ALTER TABLE "_HashTagToIcecream" ADD FOREIGN KEY ("A") REFERENCES "HashTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashTagToIcecream" ADD FOREIGN KEY ("B") REFERENCES "Icecream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
