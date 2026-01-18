import express from "express";
import { ThoughtService } from "../services/thoughtService.js";

const router = express.Router();
const thoughtService = new ThoughtService();

// GET /api/thoughts - Get all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughts = await thoughtService.findAll();
    res.json({ success: true, data: thoughts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch thoughts" });
  }
});

// POST /api/thoughts - Create a new thought
router.post("/", async (req, res) => {
  try {
    const {
      title,
      content,
      emoji,
      date,
      responseSummary,
      responseSuggestions,
      responseReframe,
      sentimentLabel,
      sentimentScore,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const thought = await thoughtService.create({
      title,
      content,
      emoji,
      date,
      responseSummary,
      responseSuggestions,
      responseReframe,
      sentimentLabel,
      sentimentScore,
    });
    res.status(201).json({ success: true, data: thought });
  } catch (error) {
    res.status(500).json({ error: "Failed to create thought" });
  }
});

export default router;
