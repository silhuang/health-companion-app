import { useEffect, useState } from "react";
import type { Thought } from "../../types/thought";
import ThoughtCard from "./ThoughtCard";

const Dashboard = () => {
  const [thoughtList, setThoughtList] = useState<Thought[]>([]);

  useEffect(() => {
    // Fetch thoughts from API or local storage
    setThoughtList([
      {
        title: "My First Thought",
        content: "This is the content of my first thought.",
        date: "2024-06-01",
        emoji: "😊",
      },
      {
        title: "Another Thought",
        content: "Here's some more content for another thought.",
        date: "2024-06-02",
        emoji: "🤔",
      },
      {
        title: "Another Thought",
        content: "Here's some more content for another thought.",
        date: "2024-06-02",
        emoji: "🤔",
      },
      {
        title: "Another Thought",
        content: "Here's some more content for another thought.",
        date: "2024-06-02",
        emoji: "🤔",
      },
    ]);
  }, []);

  return (
    <div className="flex flex-1 gap-2 bg-background">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 flex-1 p-4">
        <h2>Your Emoji Board</h2>
        <div
          className="rounded-4xl bg-card"
          style={{ height: "calc(100vh - var(--navbar-height, 64px))" }}
        ></div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-4 p-4 flex-1">
        <h2>Your Thoughts</h2>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {thoughtList.map((thought, index) => (
            <ThoughtCard
              title={thought.title}
              content={thought.content}
              date={thought.date}
              emoji={thought.emoji}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
