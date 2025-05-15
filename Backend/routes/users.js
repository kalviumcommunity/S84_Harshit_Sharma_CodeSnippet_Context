const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create user
router.post("/", async (req, res) => {
  try {
    const { username, email, bio } = req.body;
    const userData = { username, email, bio };
    
    const user = await User.create(userData);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
