import type { Thought } from "../../types/thought";

interface ThoughtCardProps extends Thought {
  index: number;
}

const ThoughtCard = ({ title, content, date, emoji, response, index }: ThoughtCardProps) => {
  return (
    <div
      className={`flex flex-col text-xl w-full gap-2 rounded-2xl px-8 py-6 ${
        index % 3 === 0
          ? "bg-card-yellow"
          : index % 2 === 0
            ? "bg-card-purple"
            : "bg-card-green"
      }`}
    >
      <div className="flex justify-between">
        <div>{emoji}</div>
        <div className="text-text-muted">{date}</div>
      </div>
      <div className="text-2xl font-bold">{title}</div>

      <div className="text-text-muted line-clamp-3">{content}</div>
      <hr className="text-text-muted" />
      <div className="text-text-muted italic truncate">
        ✨ {response || content}
      </div>
    </div>
  );
};

export default ThoughtCard;
