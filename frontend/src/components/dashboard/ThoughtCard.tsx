import type { Thought } from "../../types/thought";

const ThoughtCard = (thought: Thought) => {
  return (
    <div className="flex flex-col w-full gap-2 rounded-2xl bg-card p-4">
      <div className="flex justify-between">
        <div>{thought.emoji}</div>
        <div>{thought.date}</div>
      </div>
      <h3>{thought.title}</h3>

      <div>{thought.content}</div>
    </div>
  );
};  

export default ThoughtCard;
