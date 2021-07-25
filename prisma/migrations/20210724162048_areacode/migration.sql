-- DropIndex
DROP INDEX "Like.userId_IcecreamTitle_unique";

-- CreateTable
CREATE TABLE "AreaCode" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "rnum" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
