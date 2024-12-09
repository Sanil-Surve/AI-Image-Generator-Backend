const express = require("express");
const { generateImage, fetchImages } = require("../controllers/imageController");

const router = express.Router();

// Routes
router.post("/generate", generateImage);
router.get("/images", fetchImages);

module.exports = router;