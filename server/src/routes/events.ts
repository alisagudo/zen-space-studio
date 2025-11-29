import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// All events
router.get("/", async (req, res) => {
  const events = await prisma.event.findMany({
    include: { room: true }
  });
  res.json(events);
});

// Events by date
router.get("/day/:date", async (req, res) => {
  const date = new Date(req.params.date);

  const events = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date(date.setHours(0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59))
      }
    }
  });

  res.json(events);
});

export default router;
