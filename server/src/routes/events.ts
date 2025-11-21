import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: { room: true }
    });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;
