// import { GoogleGenAI } from "@google/genai";
// import dotenv from "dotenv/config"

// export class GeminiHelper{
//     messageId = 0;

//     ai = new GoogleGenAI({
//         apiKey: process.env.GEMINI_API_KEY,
//     });

//     constructor(){

//     }

//     async send(text) {

//         const start = Date.now();

//         console.log(`${this.messageId} GeminiHelper sent ` + text);
//         const response = await this.ai.models.generateContent({
//             model: "gemini-3-flash-preview",
//             contents: text,
//         });

//         const end = Date.now();

//         console.log(`${this.messageId} GeminiHelper received ` + response.text);
//         console.log(`${this.messageId++} Time elapsed: ${end - start} ms`);
//     }
// }

// // Test code
// (async () => {
//     const gemini = new GeminiHelper();
//     await gemini.send("Explain how AI works in a few words");
// })();
