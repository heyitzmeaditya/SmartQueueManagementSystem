const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const tokenRoutes = require("./routes/tokenRoutes");


const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
}));
app.use(express.json());
app.use("/api", tokenRoutes);


// Simple test route
app.get("/", (req, res) => {
  res.send("Smart Queue Backend is running ✅");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
