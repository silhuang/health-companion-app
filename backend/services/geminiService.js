import { GoogleGenAI, Type } from "@google/genai";

const MOOD_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    sentimentLabel: {
      type: Type.STRING,
      description:
        "A single descriptive emotion word for the entry (e.g., Joyful, Melancholy, Anxious, Serene, Frustrated, Grateful).",
    },
    sentimentScore: {
      type: Type.NUMBER,
      description:
        "A numerical score representing the sentiment from -10 (extremely negative) to 10 (extremely positive).",
    },
    summary: {
      type: Type.STRING,
      description: "A concise, two-sentence summary of the journal entry and how the user is feeling.",
    },
    suggestions: {
      type: Type.ARRAY,
      items: { type: "string" },
      description:
        "A short list of 3 empathetic, and actionable pieces of suggestions specifically tailored to the user's current state and situation. Return in JSON array format.",
    },
    reframe: {
      type: Type.STRING,
      description:
        "In 2 or less sentences, reframe the negative thoughts in the entry into a neutral and objective tone.",
    },
  },
  required: [
    "sentimentLabel",
    "sentimentScore",
    "summary",
    "suggestions",
    "reframe",
  ],
};

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("API Key is missing.");
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

export const analyzeJournalEntry = async (
  text,
) => {
  const ai = getClient();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the mood and sentiment of the following journal entry: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: MOOD_SCHEMA,
        systemInstruction:
          "You are an empathetic emotional wellness assistant. Analyze journal entries with psychological depth and nuance. Avoid generic responses. Respond as if you were talking to the user directly.",
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response received from Gemini.");
    }

    const analysis = JSON.parse(jsonText);
    return analysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze journal entry. Please try again.");
  }
};
