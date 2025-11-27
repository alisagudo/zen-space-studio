import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.get("/", async (req, res) => {
  const info = await prisma.studioInfo.findFirst();
  res.json(info);
});

export default router;
