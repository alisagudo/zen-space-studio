import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.get("/", async (req, res) => {
  const registrations = await prisma.registration.findMany({
    include: { event: true }
  });
  res.json(registrations);
});

export default router;
