import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// CREATE contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const msg = await prisma.contactMessage.create({
      data: { name, email, phone, message }
    });

    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Admin fetches all messages
router.get("/", async (req, res) => {
  const messages = await prisma.contactMessage.findMany();
  res.json(messages);
});

export default router;
