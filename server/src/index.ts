import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Zen Space Studio API is running 🚀");
});

app.listen(4000, () => {
  console.log("Server started on http://localhost:4000");
});
