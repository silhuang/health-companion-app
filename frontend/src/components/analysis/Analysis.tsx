import AnalysisCard from "./AnalysisCard";

const Analysis = () => {
  return (
    <div className="flex flex-col gap-12 p-12 max-w-350 mx-auto">
      <div className="text-2xl font-bold">Analysis</div>
      <div className="flex flex-1">
        <AnalysisCard
          color="bg-card-yellow"
          sentimentRating={8}
          sentimentLabel="Joyful"
          title="How you're feeling"
          content="It sounds like you're going through a difficult time. Your feelings are valid, and it's okay to feel sad sometimes."
        />
      </div>
      <div className="flex flex-1 gap-12">
        <AnalysisCard
          color="bg-card-purple"
          title="Gentle suggestions"
          listContent={[
            "Be gentle with yourself today",
            "Reach out to someone you trust",
            "Try a comforting activity like a warm drink or cozy blanket",
          ]}
        />
        <AnalysisCard
          color="bg-card-green"
          title="A different perspective"
          content="Sadness often shows us what matters most to us. This feeling will pass, and you have the strength to get through it."
        />
      </div>
    </div>
  );
};

export default Analysis;
