const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
  },
  country: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Brand", brandSchema);
