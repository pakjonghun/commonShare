-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "icecreamId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like.userId_icecreamId_unique" ON "Like"("userId", "icecreamId");

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("icecreamId") REFERENCES "Icecream"("id") ON DELETE SET NULL ON UPDATE CASCADE;
