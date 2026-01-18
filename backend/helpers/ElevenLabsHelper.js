// import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
// import dotenv from "dotenv/config"


// export class ElevenLabsHelper {

//     elevenlabs = new ElevenLabsClient({
//         apiKey: process.env.ELEVENLABS_API_KEY
//     });

//     constructor() {

//     }

//     async textToSpeech(text) {
//         const audio = await this.elevenlabs.textToSpeech.convert(
//             'JBFqnCBsd6RMkjVDRZzb', // voice_id
//             {
//                 text: text,
//                 modelId: 'eleven_multilingual_v2',
//                 outputFormat: 'mp3_44100_128', // output_format
//             }
//         );
//         return audio;
//     }

//     async speechToText(sound) {
//         const audioBlob = new Blob(
//             [await sound.arrayBuffer()],
//             { type: "audio/mp3" }
//         );

//         const transcription = await this.elevenlabs.speechToText.convert({
//             file: audioBlob,
//             modelId: "scribe_v2",
//             tagAudioEvents: true,
//             languageCode: "eng",
//             diarize: true,
//         });

//         return transcription.text;
//     }

// }

// (async()=> {
//     const elevenLabsHelper = new ElevenLabsHelper();

//     // Speech to text
//     const result = await elevenLabsHelper.speechToText(
//         await fetch("https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"));
//     console.log(result);

//     // Text to speech
//     const audio = await elevenLabsHelper.textToSpeech("Hello");
//     await play(audio);
// })();

