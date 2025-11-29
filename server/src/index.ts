import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Prisma client import
import { prisma } from "./prisma";

import studioInfoRoutes from "./routes/studioInfo";
import contactFormRoutes from "./routes/contactForm";
import authRoutes from "./routes/auth";
import bookingFormRoutes from "./routes/bookingForm";
import bookingsRoutes from "./routes/bookings";
import eventsRoutes from "./routes/events";
import registrationFormRoutes from "./routes/registrationForm";
import registrationsRoutes from "./routes/registrations";
import roomsRoutes from "./routes/rooms";

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
app.use("/auth", authRoutes);
app.use("/booking", bookingFormRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/events", eventsRoutes);
app.use("/registration", registrationFormRoutes);
app.use("/registrations", registrationsRoutes);
app.use("/rooms", roomsRoutes);
