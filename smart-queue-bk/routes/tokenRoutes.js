const express = require("express");
const Token = require("../models/Token");
const Settings = require("../models/Settings");
const Staff = require("../models/Staff");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();


/* ===========================
   USER: CREATE TOKEN
=========================== */
router.post("/tokens", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const lastToken = await Token.findOne().sort({ tokenNumber: -1 });
    const nextTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;

    const tokensAhead = await Token.countDocuments({
      status: { $in: ["waiting", "serving"] },
    });

    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ avgServiceTime: 3 });
    }

    const estimatedWaitingTime = tokensAhead * settings.avgServiceTime;

    const EXPIRY_MINUTES = 15;

    const newToken = await Token.create({
      name,
      tokenNumber: nextTokenNumber,
      status: "waiting",
      expiresAt: new Date(Date.now() + EXPIRY_MINUTES * 60 * 1000),
    });

    res.status(201).json({
      message: "Token created successfully",
      tokenNumber: newToken.tokenNumber,
      tokensAhead,
      estimatedWaitingTime,
    });
  } catch (err) {
    console.error("Token error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   PUBLIC: LIVE QUEUE
=========================== */
router.get("/queue", async (req, res) => {
  try {
    let currentServing = await Token.findOne({ status: "serving" }).sort({
      tokenNumber: 1,
    });

    let waitingTokens = await Token.find({ status: "waiting" })
      .sort({ tokenNumber: 1 })
      .select("tokenNumber");

    if (!currentServing && waitingTokens.length > 0) {
      currentServing = waitingTokens[0];
      waitingTokens = waitingTokens.slice(1);
    }

    const servedTokens = await Token.find({ status: "served" })
      .sort({ tokenNumber: -1 })
      .limit(20)
      .select("tokenNumber");

    res.json({
      currentServing: currentServing ? currentServing.tokenNumber : null,
      waitingTokens: waitingTokens.map((t) => t.tokenNumber),
      servedTokens: servedTokens.map((t) => t.tokenNumber),
    });
  } catch (err) {
    console.error("Queue error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   STAFF: SERVE NEXT TOKEN
=========================== */
router.post("/serve-next", async (req, res) => {
  try {
    const currentServing = await Token.findOne({ status: "serving" });

    if (currentServing) {
      currentServing.status = "served";
      currentServing.servedAt = new Date();
      await currentServing.save();
    }

    const nextToken = await Token.findOne({ status: "waiting" }).sort({
      tokenNumber: 1,
    });

    if (nextToken) {
      nextToken.status = "serving";
      await nextToken.save();
    }

    res.json({
      message: "Next token served ✅",
      nowServing: nextToken ? nextToken.tokenNumber : null,
    });
  } catch (err) {
    console.error("Serve next error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   ADMIN: RESET QUEUE
=========================== */
router.post("/admin/reset-queue", async (req, res) => {
  try {
    await Token.deleteMany({});
    res.json({ message: "Queue reset successfully ✅" });
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   ADMIN: SET AVG TIME
=========================== */
router.post("/admin/set-avg-time", async (req, res) => {
  try {
    const { avgServiceTime } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ avgServiceTime });
    } else {
      settings.avgServiceTime = avgServiceTime;
      await settings.save();
    }

    res.json({
      message: "Average service time updated ✅",
      avgServiceTime,
    });
  } catch (err) {
    console.error("Avg time error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   ADMIN: CREATE STAFF
=========================== */
router.post("/admin/create-staff", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await Staff.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Staff already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = await Staff.create({
      email,
      password: hashedPassword,
    });

    res.json({
      message: "Staff created successfully ✅",
      staff: newStaff.email,
    });
  } catch (err) {
    console.error("Create staff error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   ADMIN: ANALYTICS
=========================== */
router.get("/admin/analytics", async (req, res) => {
  try {
    const servedCount = await Token.countDocuments({ status: "served" });
    const expiredCount = await Token.countDocuments({ status: "expired" });

    res.json({
      tokensServed: servedCount,
      tokensExpired: expiredCount,
      peakRushTime: "1 PM - 3 PM",
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   STAFF LOGIN (JWT)
=========================== */
router.post("/staff/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: staff._id, role: "staff" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Staff login successful ✅",
      token,
      role: "staff",
    });
  } catch (err) {
    console.error("Staff login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   ADMIN LOGIN (JWT)
=========================== */
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Admin login successful ✅",
      token,
      role: "admin",
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
