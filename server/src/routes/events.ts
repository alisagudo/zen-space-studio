import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

/**
 * GET /events
 * Returns ALL events with room info
 */
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: { room: true },
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

/**
 * GET /events/day/:date
 * Returns events on a specific day
 * Expects date in YYYY-MM-DD
 */
router.get("/day/:date", async (req, res) => {
  try {
    const dateStr = req.params.date; // "2025-12-01"

    // Build full day boundaries
    const start = new Date(`${dateStr}T00:00:00`);
    const end = new Date(`${dateStr}T23:59:59`);

    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
      include: { room: true },
    });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events for date" });
  }
});

export default router;
