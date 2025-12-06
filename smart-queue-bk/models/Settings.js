const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  avgServiceTime: {
    type: Number,
    default: 3,
  },
});

module.exports = mongoose.model("Settings", settingsSchema);
