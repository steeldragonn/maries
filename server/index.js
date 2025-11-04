const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const worksRouter = require("./routes/works");
const db = require("./db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS має бути до всіх маршрутів
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5175"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware
app.use(express.json());
app.use("/artworks", express.static("artworks"));

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// ✅ Підключаємо API
app.use("/api/works", worksRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
