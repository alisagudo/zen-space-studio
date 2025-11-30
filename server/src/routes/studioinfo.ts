import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

/**
 * GET — Fetch studio info (always returns a record)
 */
router.get("/", async (req, res) => {
  try {
    let info = await prisma.studioInfo.findFirst();

    // Auto-create default row if missing (safety fallback)
    if (!info) {
      info = await prisma.studioInfo.create({
        data: {
          name: "Zen Space Studio",
          description:
            "Calm your mind, nourish your soul & connect with your body.",
          location: "Kalaranna 8/11, Tallinn",
          phone: "+372 5275632",
          email: "mia@zenspace.ee",
          instagram: "@zen.space.studio",
          facebook: "Zen Space Studio",
          hours: "Esmaspäev - pühapäev, 7:00 - 23:00",
        },
      });
    }

    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch studio info" });
  }
});

/**
 * PUT — Update studio info
 * For admin panel usage
 */
router.put("/", async (req, res) => {
  try {
    const {
      name,
      description,
      location,
      phone,
      email,
      instagram,
      facebook,
      hours,
    } = req.body;

    // Ensure a record exists
    let info = await prisma.studioInfo.findFirst();
    if (!info) {
      info = await prisma.studioInfo.create({
        data: {
          name: "Zen Space Studio",
          description:
            "Calm your mind, nourish your soul & connect with your body.",
          location: "Kalaranna 8/11, Tallinn",
          phone: "+372 5275632",
          email: "mia@zenspace.ee",
          instagram: "@zen.space.studio",
          facebook: "Zen Space Studio",
          hours: "Esmaspäev - pühapäev, 7:00 - 23:00",
        },
      });
    }

    const updated = await prisma.studioInfo.update({
      where: { id: info.id },
      data: {
        name,
        description,
        location,
        phone,
        email,
        instagram,
        facebook,
        hours,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update studio info" });
  }
});

export default router;
