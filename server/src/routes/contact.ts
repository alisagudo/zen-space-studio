import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const message = await prisma.contactMessage.create({
      data: req.body
    });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit message" });
  }
});

export default router;

