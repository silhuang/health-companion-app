import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

// initialize once using your API key
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export const generateTTS = async (text) => {
  try {
    const audio = await elevenlabs.textToSpeech.convert(
      "JBFqnCBsd6RMkjVDRZzb", // voice_id
      {
        text: text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128", // output_format
      },
    );
    return audio;
  } catch (error) {
    println("ElevenLabs TTS Error:", error);
    throw new Error("Failed to generate text-to-speech. Please try again.");
  }
};
