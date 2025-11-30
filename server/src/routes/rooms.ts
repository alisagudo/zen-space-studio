import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

/**
 * GET — fetch all rooms (always at least one)
 */
router.get("/", async (req, res) => {
  try {
    let rooms = await prisma.room.findMany();

    // Auto-create default room if DB is empty
    if (rooms.length === 0) {
      const defaultRoom = await prisma.room.create({
        data: {
          name: "Zen Space Studio Room 1",
          capacity: 15,
        },
      });
      rooms = [defaultRoom];
    }

    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

/**
 * PUT — update room (admin feature)
 */
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, capacity } = req.body;

    const updated = await prisma.room.update({
      where: { id },
      data: { name, capacity },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update room" });
  }
});

export default router;
