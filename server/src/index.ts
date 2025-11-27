import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Prisma client import
import { prisma } from "./prisma";

// Routerid
import roomsRouter from "./routes/rooms";
import eventsRouter from "./routes/events";
import bookingsRouter from "./routes/bookings";
import contactRouter from "./routes/contact";
import studioRouter from "./routes/studio";

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
