// import express from "express";
// import "dotenv/config";
// import {GeminiHelper} from "./helpers/GeminiHelper.js";
// import {ElevenLabsHelper} from "./helpers/ElevenLabsHelper.js";

// const app = express();
// const PORT = process.env.PORT || 3001;

// const elevenLabsHelper = new ElevenLabsHelper();
// const geminiHelper = new GeminiHelper();

// // Middleware
// app.use(express.json());

// // Health check
// app.get("/", (req, res) => {
//     res.send("Backend is running");
// });

// // Message Request
// app.get("/message", async (req, res) => {
//     const message = req.body.content;

//     res.json({content: await geminiHelper.send(message)});
// });

// // Text to Speech
// app.get("/textToSpeech", async (req, res) => {
//     const text = req.body.content;
//     res.json({content: await elevenLabsHelper.textToSpeech(text)});
// });

// // Speech to Text
// app.get("/SpeechToText", async (req, res) => {
//     const sound = req.body.content;
//     res.json({content: await elevenLabsHelper.speechToText(sound)});
// });


// // Start server
// app.listen(PORT, () => {
//     console.log(`Server listening on http://localhost:${PORT}`);
// });

import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/database.js";
import geminiRouter from "./routers/geminiRoute.js";
import thoughtRouter from "./routers/thoughtRoute.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB().catch(console.error);

// Middleware
app.use(cors());
app.use(express.json());

// Mount the routers
app.use("/api/gemini", geminiRouter);
app.use("/api/thoughts", thoughtRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});