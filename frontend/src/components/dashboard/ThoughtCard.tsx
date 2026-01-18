import type { Thought } from "../../types/thought";
import { LoadingSpinner } from "./LoadingSpinner";


interface ThoughtCardProps extends Thought {
  index: number;
}

const EMOTIONS = [
  { name: "Happy", icon: "happy" },
  { name: "Calm", icon: "calm" },
  { name: "Sad", icon: "sad" },
  { name: "Overwhelmed", icon: "overwhelmed" },
  { name: "Angry", icon: "angry" },
  { name: "Confused", icon: "confused" },
];

const ThoughtCard = ({
  title,
  content,
  date,
  emoji,
  response,
  index,
}: ThoughtCardProps) => {
  const emotion = EMOTIONS.find((e) => e.name === emoji);

  return (
    <div
      className={`flex flex-col text-xl w-full gap-2 rounded-2xl px-8 py-6 
        cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 hover:-translate-y-1"
        ${
          index % 3 === 0
            ? "bg-card-yellow"
            : index % 2 === 0
              ? "bg-card-purple"
              : "bg-card-green"
        }`}
    >
      <div className="flex justify-between items-center">
        {emotion && (
          <img
            src={`/src/assets/emojis/${emotion.icon}.svg`}
            alt={emotion.name}
            className="w-14 h-14"
          />
        )}
        <div className="text-text-muted">{date}</div>
      </div>
      <div className="text-2xl font-bold">{title}</div>

      <div className="text-text-muted line-clamp-3">{content}</div>
      <hr className="text-text-muted" />
      <div className="text-text-muted italic truncate">
        ✨ {response || content}
      </div>
      {/*<LoadingSpinner></LoadingSpinner>*/}
    </div>
  );
};

export default ThoughtCard;
