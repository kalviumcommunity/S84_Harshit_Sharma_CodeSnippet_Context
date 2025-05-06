
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

module.exports = mongoose.model("Snippet", SnippetSchema);
