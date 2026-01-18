import AnalysisCard from "./AnalysisCard";
import {
  HeartIcon,
  LightBulbIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Analysis = () => {
  return (
    <div className="flex flex-col gap-8 p-12 max-w-350 mx-auto">
      <div className="text-3xl font-bold">Your Thought Analysis</div>
      <div className="flex flex-1">
        <AnalysisCard
          color="yellow"
          sentimentRating={8}
          sentimentLabel="Joyful"
          icon={HeartIcon}
          title="How you're feeling"
          content="It sounds like you're going through a difficult time. Your feelings are valid, and it's okay to feel sad sometimes."
        />
      </div>
      <div className="flex flex-1 gap-8">
        <AnalysisCard
          color="purple"
          icon={LightBulbIcon}
          title="Gentle suggestions"
          listContent={[
            "Be gentle with yourself today",
            "Reach out to someone you trust",
            "Try a comforting activity like a warm drink or cozy blanket",
          ]}
        />
        <AnalysisCard
          color="green"
          icon={SparklesIcon}
          title="A different perspective"
          content="Sadness often shows us what matters most to us. This feeling will pass, and you have the strength to get through it."
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => {}}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#ddd] text-gray-800 font-medium hover:bg-[#5fa89b] transition-colors"
        >
          <span className="hidden md:inline">Discard</span>
        </button>
        <button
          onClick={() => {}}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#79D2BC] text-gray-800 font-medium hover:bg-[#5fa89b] transition-colors"
        >
          <span className="hidden md:inline">Save & Close</span>
        </button>
      </div>
    </div>
  );
};

export default Analysis;
