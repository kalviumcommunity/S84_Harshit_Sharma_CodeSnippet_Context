const express = require("express");
const router = express.Router();
const Snippet = require("../models/Snippet");

// Get all snippets
router.get("/", async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json({ success: true, count: snippets.length, data: snippets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single snippet
router.get("/:id", async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet)
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });
    res.json({ success: true, data: snippet });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create snippet
router.post("/", async (req, res) => {
  try {
    // Temporary, will replace with auth later
    req.body.user = "6501234567890123456789ab";
    const snippet = await Snippet.create(req.body);
    res.status(201).json({ success: true, data: snippet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
