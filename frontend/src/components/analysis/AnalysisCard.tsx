import React from "react";

type AnalysisCardProps = {
  color?: string;
  sentimentRating?: number;
  sentimentLabel?: string;
  icon?: React.ComponentType<any>;
  title: string;
  content?: string;
  listContent?: string[];
};

const COLOR_MAP = {
  green: {
    base: "bg-card-green",
    dark: "bg-card-green-dark",
  },
  yellow: {
    base: "bg-card-yellow",
    dark: "bg-card-yellow-dark",
  },
  purple: {
    base: "bg-card-purple",
    dark: "bg-card-purple-dark",
  },
};

const AnalysisCard = ({
  color,
  sentimentRating,
  sentimentLabel,
  icon,
  title,
  content,
  listContent,
}: AnalysisCardProps) => {
  return (
    <div className={`flex flex-col w-full gap-4 rounded-2xl p-12 ${COLOR_MAP[color].base}`}>
      {sentimentRating && sentimentLabel && (
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 flex items-center justify-center font-bold text-2xl rounded-2xl bg-card-green/90">
            {sentimentRating}
          </div>
          <div className="font-black text-2xl">{sentimentLabel}</div>
        </div>
      )}
      <div className="flex gap-4 items-center">
        <div className={`w-12 h-12 flex items-center justify-center ${COLOR_MAP[color].dark} rounded-2xl`}>
          {icon &&
            React.createElement(icon, { className: "w-8 h-8 text-text-muted" })}
        </div>
        <div className="text-2xl font-bold">{title}</div>
      </div>
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
