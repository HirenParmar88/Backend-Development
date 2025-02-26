const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
          default: () => Date.now(), // Auto-add timestamp on visits
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Create and export the model
const UrlModel = mongoose.model("URL", urlSchema);
module.exports = UrlModel;
