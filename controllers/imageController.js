const axios = require("axios");
const cloudinary = require("../config/cloudinaryConfig");
const Image = require("../models/Image");

// Generate image, upload to Cloudinary, and save metadata to MongoDB
const generateImage = async (req, res) => {
  const { prompt } = req.body;

  try {
    // Generate image with OpenAI API
    const response = await axios({
      method: "post",
      url: "https://api.openai.com/v1/images/generations",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      data: { prompt, n: 1, size: "512x512" },
    });

    const imageUrl = response.data.data[0].url;

    // Upload to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
      folder: "generated_images",
    });

    // Save to MongoDB
    const savedImage = await Image.create({
      prompt,
      cloudinaryUrl: uploadedImage.secure_url,
    });

    // Send response
    res.status(200).json({ cloudinaryUrl: savedImage.cloudinaryUrl });
  } catch (error) {
    console.error("Error generating image:", error.response?.data || error.message);
    res.status(500).json({ error: "Image generation failed. Please try again." });
  }
};

// Fetch all images from MongoDB
const fetchImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error.message);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

module.exports = {
  generateImage,
  fetchImages,
};