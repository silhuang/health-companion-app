import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import thoughtBubble from "../../assets/thought_bubble.png";

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

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      title: thought,
      content: details,
      emotion: selectedEmotion,
    });
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

    navigate("/thought-analysis", {
      state: {
        sentimentLabel: response.sentimentLabel,
        sentimentScore: response.sentimentScore,
        summaryContent: response.summary,
        suggestionsContent: response.suggestions,
        reframeContent: response.reframe,
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
          <input
            type="text"
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="Give your thought a title..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79D2BC]"
          />
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
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Share more about what you're thinking..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79D2BC] h-32 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#79D2BC] hover:bg-[#5fa89b] text-gray-800 font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16183575 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99 L3.03521743,10.4310845 C3.03521743,10.5881819 3.19218622,10.7452793 3.50612381,10.7452793 L16.6915026,11.5307661 C16.6915026,11.5307661 17.1624089,11.5307661 17.1624089,12.0020583 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
          </svg>
          Submit
        </button>
      </div>
    </div>
  );
}
