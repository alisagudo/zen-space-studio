import express from "express";
import cors from "cors";
import { prisma } from "./db";

// Routerid:
import roomsRouter from "./routes/rooms";
import bookingsRouter from "./routes/bookings";
import eventsRouter from "./routes/events";
import contactRouter from "./routes/contact";
import studioRouter from "./routes/studio";

const app = express();
app.use(cors());
app.use(express.json());

// API endpointid
app.use("/rooms", roomsRouter);
app.use("/bookings", bookingsRouter);
app.use("/events", eventsRouter);
app.use("/contact", contactRouter);
app.use("/studio", studioRouter);

app.get("/", (req, res) => {
  res.send("Zen Space Studio API is running 🚀");
});

// server
app.listen(4000, () => {
  console.log("Server started on http://localhost:4000");
});
