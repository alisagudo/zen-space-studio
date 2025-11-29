/*
  Warnings:

  - You are about to drop the column `time` on the `Event` table. All the data in the column will be lost.
  - Added the required column `durationHrs` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'PROVIDER', 'VISITOR');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "durationHrs" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "otherType" TEXT,
ADD COLUMN     "people" INTEGER NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "time",
ADD COLUMN     "bookingId" INTEGER,
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 15,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "participants" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'VISITOR',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
