import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AnalysisCard from "./AnalysisCard";
import {
  HeartIcon,
  LightBulbIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Analysis = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const location = useLocation();
  const {
    sentimentLabel,
    sentimentScore,
    summaryContent,
    suggestionsContent,
    reframeContent,
    title,
    content,
    emoji,
  } = location.state || {};

  const addToDatabase = async () => {
    setIsSaving(true);
    try {
      const url = "http://localhost:3001/api/thoughts";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emoji: emoji, 
          date: new Date().toISOString(),
          title: title, 
          content: content, 
          responseSummary: summaryContent,
          responseSuggestions: suggestionsContent,
          responseReframe: reframeContent,
          sentimentLabel: sentimentLabel,
          sentimentScore: sentimentScore,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Thought added successfully:", data);

      navigate("/");
    } catch (error) {
      console.error("Error adding thought to database:", error);
      alert("Failed to save thought. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-12 max-w-350 mx-auto">
      <div className="text-3xl font-bold ">Your Thought Analysis</div>
      <div className="flex flex-1 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
        <AnalysisCard
          color="yellow"
          sentimentRating={sentimentScore}
          sentimentLabel={sentimentLabel}
          icon={HeartIcon}
          title="How you're feeling"
          content={summaryContent}
        />
      </div>
      <div className="flex flex-1 gap-8">
        <div className="flex flex-1 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
          <AnalysisCard
            color="purple"
            icon={LightBulbIcon}
            title="Gentle suggestions"
            listContent={suggestionsContent}
          />
        </div>
        <div className="flex flex-1 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
          <AnalysisCard
            color="green"
            icon={SparklesIcon}
            title="A different perspective"
            content={reframeContent}
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => {
            // ADD TO DB*****************
            navigate("/");
          }}
          className="cursor-pointer flex items-center gap-2 px-6 py-2 rounded-full bg-[#ddd] text-gray-800 font-medium hover:bg-[#aaa] transition-colors"
        >
          <span className="hidden md:inline">Discard</span>
        </button>
        <button
          onClick={addToDatabase}
          disabled={isSaving}
          className="cursor-pointer flex items-center gap-2 px-6 py-2 rounded-full bg-[#79D2BC] text-gray-800 font-medium hover:bg-[#5fa89b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="hidden md:inline">
            {isSaving ? "Saving..." : "Save & Close"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Analysis;
