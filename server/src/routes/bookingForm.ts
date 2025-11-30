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

    // start & end timestamps
    const start = new Date(`${date}T${time}`);
    const end = new Date(start.getTime() + Number(duration) * 60 * 60 * 1000);

    // Create booking request
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        date: new Date(date),
        startTime: start,
        endTime: end,
        durationHrs: Number(duration),
        people: Number(people),
        eventType,
        otherType: otherEventType,
        notes,
        roomId: 1, // 1 room in studio
      }
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit booking" });
  }
});

export default router;
