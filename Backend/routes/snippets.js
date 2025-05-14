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

// Update a snippet
router.post("/:id/update", async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!snippet) {
      return res.status(404).json({ success: false, error: "Snippet not found" });
    }
    
    res.json({ success: true, data: snippet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Add a like to a snippet
router.post("/:id/like", async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    
    if (!snippet) {
      return res.status(404).json({ success: false, error: "Snippet not found" });
    }
    
    // Temporary user ID (in a real app, would come from auth)
    const userId = "6501234567890123456789ab";
    
    // Check if user already liked
    if (snippet.likes.includes(userId)) {
      return res.status(400).json({ success: false, error: "Snippet already liked" });
    }
    
    snippet.likes.push(userId);
    await snippet.save();
    
    res.json({ success: true, data: snippet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Add a comment to a snippet
router.post("/:id/comments", async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    
    if (!snippet) {
      return res.status(404).json({ success: false, error: "Snippet not found" });
    }
    
    // Temporary user ID (in a real app, would come from auth)
    const comment = {
      user: "6501234567890123456789ab",
      text: req.body.text,
      createdAt: new Date()
    };
    
    snippet.comments.push(comment);
    await snippet.save();
    
    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Fork a snippet (create a copy)
router.post("/:id/fork", async (req, res) => {
  try {
    const originalSnippet = await Snippet.findById(req.params.id);
    
    if (!originalSnippet) {
      return res.status(404).json({ success: false, error: "Snippet not found" });
    }
    
    // Create new snippet based on original
    const newSnippet = {
      title: `Fork of ${originalSnippet.title}`,
      code: originalSnippet.code,
      language: originalSnippet.language,
      description: originalSnippet.description,
      user: "6501234567890123456789ab", // Temporary user ID
      forkedFrom: originalSnippet._id
    };
    
    const snippet = await Snippet.create(newSnippet);
    res.status(201).json({ success: true, data: snippet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});


module.exports = router;
