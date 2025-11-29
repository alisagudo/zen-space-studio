import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// All bookings + their events
router.get("/", async (req, res) => {
  const bookings = await prisma.booking.findMany({
    include: { events: true, room: true }
  });
  res.json(bookings);
});

// Approve booking (admin)
router.post("/:id/approve", async (req, res) => {
  const bookingId = Number(req.params.id);

  // Approve booking
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "Approved" }
  });

  // Generate the event (if booking is approved)
  const event = await prisma.event.create({
    data: {
      title: booking.eventType === "other" ? booking.otherType! : booking.eventType,
      instructor: booking.name,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      capacity: 15,
      roomId: booking.roomId,
      bookingId: bookingId
    }
  });

  res.json({ booking, event });
});

// Reject booking
router.post("/:id/reject", async (req, res) => {
  const bookingId = Number(req.params.id);

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "Rejected" }
  });

  res.json(booking);
});

export default router;
