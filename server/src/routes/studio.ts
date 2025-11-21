import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET studio info 
router.get("/", async (req, res) => {
  try {
    const info = await prisma.studioInfo.findFirst();
    res.json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch studio info" });
  }
});

export default router;
