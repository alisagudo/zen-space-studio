/*
  Warnings:

  - You are about to drop the column `endTime` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructor` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfPeople` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_roomId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "endTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "instructor" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "numberOfPeople" INTEGER NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "startTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "bookingId" INTEGER NOT NULL,
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentParticipants" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "EventParticipant" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipant" ADD CONSTRAINT "EventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
