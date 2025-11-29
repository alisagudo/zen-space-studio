import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to load services" });
  }
});

// GET by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!service) return res.status(404).json({ error: "Service not found" });

    res.json(service);
  } catch {
    res.status(500).json({ error: "Failed to fetch service" });
  }
});

// POST new service (Admin only)
router.post("/", async (req, res) => {
  try {
    const { title, description, icon, category } = req.body;

    const created = await prisma.service.create({
      data: { title, description, icon, category }
    });

    res.status(201).json(created);
  } catch {
    res.status(500).json({ error: "Failed to create service" });
  }
});

export default router;
