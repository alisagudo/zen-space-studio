import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// POST booking request
router.post("/", async (req, res) => {
  try {
    const {
      name, email, phone,
      date, time, duration,
      people, eventType, otherEventType,
      notes
    } = req.body;

    // Create booking request
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        date: new Date(date),
        startTime: new Date(`${date}T${time}`),
        endTime: new Date(`${date}T${time}`),
        durationHrs: Number(duration),
        people: Number(people),
        eventType,
        otherType: otherEventType,
        notes,
        roomId: 1,     // Currently studio has 1 room
      }
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit booking" });
  }
});

export default router;
