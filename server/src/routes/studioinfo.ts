import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET studio info
router.get("/", async (req, res) => {
  try {
    const info = await prisma.contactInfo.findFirst();

    if (!info) {
      return res.json({
        name: "Zen Space Studio",
        description: "Calm your mind, nourish your soul & connect with your body.",
        location: "Kalaranna 8/11, Tallinn",
        phone: "+372 5275632",
        email: "mia@zenspace.ee",
        instagram: "@zen.space.studio",
        facebook: "Zen Space Studio",
        hours: "Esmaspäev - pühapäev, 7:00 - 23:00"
      });
    }

    res.json(info);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch studio info" });
  }
});

export default router;
