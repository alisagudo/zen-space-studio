import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// Visitor registers for an event
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message, eventId } = req.body;

    const event = await prisma.event.findUnique({
      where: { id: Number(eventId) }
    });

    if (!event) return res.status(404).json({ error: "Event not found" });

    // Check capacity
    if (event.participants >= event.capacity) {
      return res.status(400).json({ error: "Event is full" });
    }

    // Create registration
    const reg = await prisma.registration.create({
      data: {
        name,
        email,
        phone,
        message,
        eventId: Number(eventId),
      }
    });

    // Update participants count
    await prisma.event.update({
      where: { id: event.id },
      data: {
        participants: event.participants + 1
      }
    });

    res.json(reg);

  } catch (err) {
    res.status(500).json({ error: "Failed to register" });
  }
});

export default router;
