import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const saved = await prisma.contactMessage.create({
      data: { name, email, phone, message }
    });

    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit message" });
  }
});

export default router;
