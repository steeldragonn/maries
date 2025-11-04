const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../db");

// Зберігання файлів
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "artworks/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 📸 GET усі роботи
router.get("/", (req, res) => {
  db.all("SELECT * FROM works ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 🖼 POST — завантаження нової роботи
router.post("/", upload.single("image"), (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageName = req.file.filename;
    const imagePath = `/artworks/${imageName}`; // ✅ публічний шлях

    const stmt = db.prepare(
      "INSERT INTO works (title, description, imagePath, price) VALUES (?, ?, ?, ?)"
    );
    stmt.run(
      title,
      description || "",
      imagePath,
      price || null,
      function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
          id: this.lastID,
          title,
          description,
          imagePath,
          price,
          message: "Artwork uploaded successfully",
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unexpected server error" });
  }
});

module.exports = router;
