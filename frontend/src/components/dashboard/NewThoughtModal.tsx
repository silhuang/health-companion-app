import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import thoughtBubble from "../../assets/thought_bubble.png";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import send from "../../assets/send.png";
import {LoadingSpinner} from "./LoadingSpinner.tsx";

interface NewThoughtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (thought: any) => void;
}

const EMOTIONS = [
  { name: "Happy", icon: "happy" },
  { name: "Calm", icon: "calm" },
  { name: "Sad", icon: "sad" },
  { name: "Overwhelmed", icon: "overwhelmed" },
  { name: "Angry", icon: "angry" },
  { name: "Confused", icon: "confused" },
];

export default function NewThoughtModal({
  isOpen,
  onClose,
  onSubmit,
}: NewThoughtModalProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [thought, setThought] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // onSubmit({
    //   title: thought,
    //   content: details,
    //   emotion: selectedEmotion,
    // });
    const savedThought = thought;
    const savedDetails = details;
    const savedEmoji = selectedEmotion;
    setIsLoading(true)
    // Reset form
    setThought("");
    setDetails("");
    setSelectedEmotion(null);

    // GEMINI API CALL
    const url = "http://localhost:3001/api/gemini/analyze";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: details }),
    });

    const data = await res.json();
    const response = data.data;

    console.log("Gemini Response:", response);
    onSubmit({
      title: thought,
      content: details,
      emotion: selectedEmotion,
    });
    setIsLoading(false);
    navigate("/thought-analysis", {
      state: {
        sentimentLabel: response.sentimentLabel,
        sentimentScore: response.sentimentScore,
        summaryContent: response.summary,
        suggestionsContent: response.suggestions,
        reframeContent: response.reframe,
        title: savedThought,
        content: savedDetails,
        emoji: savedEmoji,
      },
    });
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-lg max-w-3xl w-full mx-4 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800">New Thought</h2>
            <img src={thoughtBubble} alt="Thought bubble" className="w-8 h-8" />
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* What's on your mind */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            What's on your mind?
          </label>
          <div className="relative">
            <input
              type="text"
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="Give your thought a title..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79D2BC]"
            />
            <button className="absolute bottom-0.45 right-0.5 text-gray-500 hover:text-gray-700 transition-colors p-4">
              <MicrophoneIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* How are you feeling */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            How are you feeling?
          </label>
          <div className="flex gap-4">
            {EMOTIONS.map((emotion) => (
              <button
                key={emotion.icon}
                onClick={() => setSelectedEmotion(emotion.name)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-colors ${
                  selectedEmotion === emotion.name
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <img
                  src={`/src/assets/emojis/${emotion.icon}.svg`}
                  alt={emotion.name}
                  className="w-16 h-16"
                />
                <span className="text-sm font-medium text-gray-700">
                  {emotion.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tell me more */}
        <div className="mb-10">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Tell me more...
          </label>
          <div className="relative items-center">
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Share more about what you're thinking..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79D2BC] h-32 resize-none"
            />
            <button className="absolute bottom-3 right-0.5 text-gray-500 hover:text-gray-700 transition-colors p-4">
              <MicrophoneIcon className="h-6 w-6" />
            </button>
          </div>
        </div>


      {isLoading && ( <div style={{ position: "fixed", inset: 0, background: "rgba(255, 255, 255, 0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, }} > <LoadingSpinner /> </div> )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#79D2BC] hover:bg-[#5fa89b] text-gray-800 font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
        >
          <img src={send} alt="Send" className="w-5 h-5" />
          Submit
        </button>
      </div>
    </div>
  );
}
