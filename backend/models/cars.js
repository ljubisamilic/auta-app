const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      trim: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    manufacturer: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    productionYear: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    images: {
      type: [Object],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
