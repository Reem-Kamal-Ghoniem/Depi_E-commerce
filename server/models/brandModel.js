const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    imageURL: {
      type: String
    },
  },
  {
    timestamps: true
  }
);

module.exports = Brand = mongoose.model("Brand", BrandSchema);
