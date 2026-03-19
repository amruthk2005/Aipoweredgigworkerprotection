const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  zone: { type: String, required: true },
  riskScore: {
    type: Number,
    default: 10
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
