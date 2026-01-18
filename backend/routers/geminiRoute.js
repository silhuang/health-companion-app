import express from 'express';
import { analyzeJournalEntry } from '../services/geminiService.js';

const router = express.Router();

// POST /api/gemini/analyze
router.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid text field in request body'
      });
    }

    const analysis = await analyzeJournalEntry(text);

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Error analyzing journal entry:', error);
    res.status(500).json({
      error: 'Failed to analyze journal entry',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;