import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.get("/", async (req, res) => {
  const bookings = await prisma.booking.findMany({
    include: { room: true, user: true }
  });
  res.json(bookings);
});

export default router;

