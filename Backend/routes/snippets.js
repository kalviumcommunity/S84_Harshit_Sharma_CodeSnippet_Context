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
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!snippet) {
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });
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
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });
    }

    // Temporary user ID (in a real app, would come from auth)
    const userId = "6501234567890123456789ab";

    // Check if user already liked
    if (snippet.likes.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, error: "Snippet already liked" });
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
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });
    }

    // Temporary user ID (in a real app, would come from auth)
    const comment = {
      user: "6501234567890123456789ab",
      text: req.body.text,
      createdAt: new Date(),
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
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });
    }

    // Create new snippet based on original
    const newSnippet = {
      title: `Fork of ${originalSnippet.title}`,
      code: originalSnippet.code,
      language: originalSnippet.language,
      description: originalSnippet.description,
      user: "6501234567890123456789ab", // Temporary user ID
      forkedFrom: originalSnippet._id,
    };

    const snippet = await Snippet.create(newSnippet);
    res.status(201).json({ success: true, data: snippet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Update a Snippet
router.put("/:id", async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!snippet) {
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });
    }

    res.json({ success: true, data: snippet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Toggle like status (using PUT for idempotent operation)
router.put("/:id/like", async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });
    }

    // Temporary user ID (in a real app, would come from auth)
    const userId = "6501234567890123456789ab";

    // Check if user already liked - if yes, remove like (toggle)
    const likeIndex = snippet.likes.indexOf(userId);
    if (likeIndex !== -1) {
      snippet.likes.splice(likeIndex, 1);
    } else {
      snippet.likes.push(userId);
    }

    await snippet.save();
    res.json({
      success: true,
      data: snippet,
      liked: likeIndex === -1, // true if like was added, false if removed
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Update a comment
router.put("/:id/comments/:commentId", async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });
    }

    // Find the comment
    const comment = snippet.comments.id(req.params.commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: "Comment not found" });
    }

    // Simple check if user owns comment
    if (comment.user.toString() !== "6501234567890123456789ab") {
      return res.status(403).json({
        success: false,
        error: "Not authorized to update this comment",
      });
    }

    // Update fields
    comment.text = req.body.text;
    comment.updatedAt = new Date();

    await snippet.save();
    res.json({ success: true, data: comment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Set snippet visibility (public/private)
router.put("/:id/visibility", async (req, res) => {
  try {
    if (!req.body.hasOwnProperty("isPublic")) {
      return res
        .status(400)
        .json({ success: false, error: "isPublic field is required" });
    }

    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res
        .status(404)
        .json({ success: false, error: "Snippet not found" });
    }

    // Simple ownership check (real app would use auth)
    if (snippet.user.toString() !== "6501234567890123456789ab") {
      return res.status(403).json({
        success: false,
        error: "Not authorized to update this snippet",
      });
    }

    snippet.isPublic = req.body.isPublic;
    await snippet.save();1

    res.json({
      success: true,
      data: snippet,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
