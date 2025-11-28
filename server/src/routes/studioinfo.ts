import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET studio info (for Kontakt.tsx)
router.get("/", async (req, res) => {
  try {
    const info = await prisma.studioInfo.findFirst();
    if (!info) {
      // Return default studio info if not in database
      return res.json({
        location: "Kalaranna 8/11, Tallinn",
        phone: "+372 5XXX XXXX",
        email: "sten@zenspace.ee",
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

// GET studio info by ID
router.get("/:id", async (req, res) => {
  try {
    const info = await prisma.studioInfo.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!info) {
      return res.status(404).json({ error: "Studio info not found" });
    }

    res.json(info);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch studio info" });
  }
});

// POST create or update studio info
router.post("/", async (req, res) => {
  try {
    const { location, phone, email, instagram, facebook, hours } = req.body;

    if (!location || !phone || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if info already exists
    const existing = await prisma.studioInfo.findFirst();

    if (existing) {
      const updated = await prisma.studioInfo.update({
        where: { id: existing.id },
        data: {
          location,
          phone,
          email,
          instagram: instagram || existing.instagram,
          facebook: facebook || existing.facebook,
          hours: hours || existing.hours
        }
      });
      return res.json(updated);
    }

    const info = await prisma.studioInfo.create({
      data: {
        location,
        phone,
        email,
        instagram: instagram || "",
        facebook: facebook || "",
        hours: hours || "7:00 - 23:00"
      }
    });

    res.status(201).json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create studio info" });
  }
});

export default router;
