const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // щоб картинки були доступні

// Простий тестовий маршрут
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = require("./db");
