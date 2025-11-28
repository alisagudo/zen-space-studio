import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Prisma client import
import { prisma } from "./prisma";

import studioInfoRoutes from "./routes/studioInfo";
import contactFormRoutes from "./routes/contactForm";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Zen Space Studio API is running!");
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
  
});

app.use("/studioinfo", studioInfoRoutes);
app.use("/contactform", contactFormRoutes);
