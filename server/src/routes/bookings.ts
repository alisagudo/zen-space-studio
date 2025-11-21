import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { room: true, user: true }
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

export default router;
