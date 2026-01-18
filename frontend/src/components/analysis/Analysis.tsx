import { useLocation, useNavigate } from "react-router-dom";
import AnalysisCard from "./AnalysisCard";
import {
  HeartIcon,
  LightBulbIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Analysis = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const {
    sentimentLabel,
    sentimentScore,
    summaryContent,
    suggestionsContent,
    reframeContent,
  } = location.state || {}; 

  return (
    <div className="flex flex-col gap-8 p-12 max-w-350 mx-auto">
      <div className="text-3xl font-bold">Your Thought Analysis</div>
      <div className="flex flex-1">
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
        <AnalysisCard
          color="purple"
          icon={LightBulbIcon}
          title="Gentle suggestions"
          listContent={suggestionsContent}
        />
        <AnalysisCard
          color="green"
          icon={SparklesIcon}
          title="A different perspective"
          content={reframeContent}
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer flex items-center gap-2 px-6 py-2 rounded-full bg-[#ddd] text-gray-800 font-medium hover:bg-[#aaa] transition-colors"
        >
          <span className="hidden md:inline">Discard</span>
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer flex items-center gap-2 px-6 py-2 rounded-full bg-[#79D2BC] text-gray-800 font-medium hover:bg-[#5fa89b] transition-colors"
        >
          <span className="hidden md:inline">Save & Close</span>
        </button>
      </div>
    </div>
  );
};

export default Analysis;
