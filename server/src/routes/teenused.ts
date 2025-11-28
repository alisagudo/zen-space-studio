import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET services info
router.get("/", async (req, res) => {
  try {
    const services = await prisma.services.findMany();
    if (services.length === 0) {
      // Return default services info if not in database
      return res.json([
        {
          id: 1,
          name: "Yoga & Meditation",
          description: "Harmoonilised ja leinavad joogasessid",
          price: 15,
          location: "Kalaranna 8/11, Tallinn",
          phone: "+372 5XXX XXXX",
          email: "sten@zenspace.ee",
          instagram: "@zen.space.studio",
          facebook: "Zen Space Studio",
          hours: "Esmaspäev - pühapäev, 7:00 - 23:00"
        },
        {
          id: 2,
          name: "Pilates",
          description: "Tugevus- ja paindumustrenning",
          price: 18,
          location: "Kalaranna 8/11, Tallinn",
          phone: "+372 5XXX XXXX",
          email: "sten@zenspace.ee",
          instagram: "@zen.space.studio",
          facebook: "Zen Space Studio",
          hours: "Esmaspäev - pühapäev, 7:00 - 23:00"
        }
      ]);
    }
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services info" });
  }
});

// GET services info by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await prisma.services.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch service" });
  }
});

// POST create or update services info
router.post("/", async (req, res) => {
  try {
    const { name, description, price, location, phone, email, instagram, facebook, hours } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Missing required fields: name, price" });
    }

    const service = await prisma.services.create({
      data: {
        name,
        description: description || "",
        price: parseFloat(price),
        location: location || "Kalaranna 8/11, Tallinn",
        phone: phone || "+372 5XXX XXXX",
        email: email || "sten@zenspace.ee",
        instagram: instagram || "@zen.space.studio",
        facebook: facebook || "Zen Space Studio",
        hours: hours || "7:00 - 23:00"
      }
    });

    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create service" });
  }
});

export default router;
