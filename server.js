// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.post("/generate", async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const response = await axios({
//       method: "post",
//       url: "https://api.openai.com/v1/images/generations",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       data: {
//         prompt, // Text prompt from the client
//         n: 1,   // Number of images
//         size: "512x512", // Image Resolution
//       },
//     });

//     // Send the generated image URL back to the frontend
//     res.status(200).json({ imageUrl: response.data.data[0].url });
//   } catch (error) {
//     console.error("Error generating image:", error.response?.data || error.message);
//     res.status(500).json({ error: "Image generation failed. Please try again." });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));