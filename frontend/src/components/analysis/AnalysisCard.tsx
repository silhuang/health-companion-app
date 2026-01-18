type AnalysisCardProps = {
  color?: string;
  sentimentRating?: number;
  sentimentLabel?: string;
  title: string;
  content?: string;
  listContent?: string[];
};

const AnalysisCard = ({
  color,
  sentimentRating,
  sentimentLabel,
  title,
  content,
  listContent,
}: AnalysisCardProps) => {
  return (
    <div className={`flex flex-col w-full gap-4 rounded-2xl p-12 ${color}`}>
      {sentimentRating && sentimentLabel && (
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 flex items-center justify-center font-bold text-2xl rounded-2xl bg-card-green/90">
            {sentimentRating}
          </div>
          <div className="font-black text-2xl">{sentimentLabel}</div>
        </div>
      )}
      <div className="text-2xl font-bold">{title}</div>
      {content && <div className="text-xl">{content}</div>}
      {listContent && (
        <div className="text-xl">
          {listContent.map((listItem) => (
            <div>{listItem}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisCard;
