const { Schema, model } = require("mongoose");

// Define Image Schema
const ImageSchema = new Schema({
  prompt: { type: String, required: true },
  cloudinaryUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export Image Model
module.exports = model("Image", ImageSchema);