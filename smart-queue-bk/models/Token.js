const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tokenNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["waiting", "serving", "served", "expired"],
    default: "waiting",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  servedAt: {
    type: Date,
  },
  expiredAt: {
    type: Date,
  },
  expiresAt: {          // ✅ FIXED (comma added above)
    type: Date,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
