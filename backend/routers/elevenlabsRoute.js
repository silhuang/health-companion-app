import express from "express";
import { generateTTS } from "../services/elevenlabsService.js";

const router = express.Router();

// POST /api/elevenlabs/tts
router.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({
        error: "Missing or invalid text field in request body",
      });
    }

    const audio = await generateTTS(text);

    // Convert audio to buffer
    let audioBuffer;
    if (audio instanceof Blob) {
      audioBuffer = Buffer.from(await audio.arrayBuffer());
    } else if (Buffer.isBuffer(audio)) {
      audioBuffer = audio;
    } else if (audio instanceof ReadableStream) {
      // Handle ReadableStream
      const chunks = [];
      const reader = audio.getReader();
      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) chunks.push(value);
      }
      audioBuffer = Buffer.concat(chunks);
    } else {
      audioBuffer = Buffer.from(await audio.arrayBuffer());
    }

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.length,
    });

    res.send(audioBuffer);
  } catch (error) {
    console.error("Error generating TTS:", error);
    res.status(500).json({
      error: "Failed to generate text-to-speech",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
