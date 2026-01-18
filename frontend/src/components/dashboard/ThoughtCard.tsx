import type { Thought } from "../../types/thought";

const ThoughtCard = (thought: Thought) => {
  return (
    <div className="flex flex-col w-full gap-1 rounded-2xl bg-card p-4">
      <div className="flex justify-between">
        <div>{thought.emoji}</div>
        <div className="text-text-muted">{thought.date}</div>
      </div>
      <div className="text-lg font-bold">{thought.title}</div>

      <div className="text-text-muted line-clamp-2">{thought.content}</div>
      <hr className="text-text-muted" />
      <div className="text-text-muted italic truncate">✨ Temp AI response text {thought.content}</div>
    </div>
  );
};

export default ThoughtCard;
