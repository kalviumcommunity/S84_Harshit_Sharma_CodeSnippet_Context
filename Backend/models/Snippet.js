const mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: false,
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  code: {
    type: String,
    required: [true, "Please add the code snippet"],
  },
  language: {
    type: String,
    required: [true, "Please specify the language"],
    trim: true,
    lowercase: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  usageExample: {
    type: String,
    required: false,
    maxlength: [1000, "Usage example cannot be more than 1000 characters"],
  },
  keyConcepts: {
    type: String,
    required: false,
    maxlength: [
      1000,
      "Key concepts explanation cannot be more than 1000 characters",
    ],
  },
  gotchas: {
    type: String,
    required: false,
    maxlength: [
      1000,
      "Gotchas/alternatives explanation cannot be more than 1000 characters",
    ],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Snippet must belong to a user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Comment Schema (embedded in Snippet)
const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Comment text is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

// Add comments to SnippetSchema
SnippetSchema.add({
  comments: [CommentSchema]
});

module.exports = mongoose.model("Snippet", SnippetSchema);
