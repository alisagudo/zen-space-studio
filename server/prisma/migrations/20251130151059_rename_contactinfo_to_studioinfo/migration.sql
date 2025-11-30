/*
  Warnings:

  - You are about to drop the `ContactInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ContactInfo";

-- CreateTable
CREATE TABLE "StudioInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagram" TEXT,
    "facebook" TEXT,
    "hours" TEXT,

    CONSTRAINT "StudioInfo_pkey" PRIMARY KEY ("id")
);
