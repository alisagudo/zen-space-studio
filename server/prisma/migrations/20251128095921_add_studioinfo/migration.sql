-- CreateTable
CREATE TABLE "StudioInfo" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudioInfo_pkey" PRIMARY KEY ("id")
);
