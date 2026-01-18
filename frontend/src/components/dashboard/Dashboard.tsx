import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import type { Thought } from "../../types/thought";
import ThoughtCard from "./ThoughtCard";
import NewThoughtModal from "./NewThoughtModal";
import emojiBoardImg from "../../assets/emoji_board.svg";

const Dashboard = forwardRef((_, ref) => {
  const [thoughtList, setThoughtList] = useState<Thought[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setIsModalOpen(true),
  }));

  useEffect(() => {
    // Fetch thoughts from API or local storage
    setThoughtList([
      {
        title: "Productive Monday",
        content:
          "Had a great start to the week. Finished all my tasks early and even had time for waking my dog and cat.",
        date: "2024-06-01",
        emoji: "😌",
        response: "Thank you for sharing your thought!",
      },
      {
        title: "Another Thought",
        content: "Here's some more content for another thought.",
        date: "2024-06-02",
        emoji: "🤔",
        response: "That's an interesting perspective.",
      },
      {
        title: "Another Thought",
        content: "Here's some more content for another thought.",
        date: "2024-06-02",
        emoji: "🤔",
        response: "That's an interesting perspective.",
      },
      {
        title: "Another Thought",
        content: "Here's some more content for another thought.",
        date: "2024-06-02",
        emoji: "🤔",
        response: "That's an interesting perspective.",
      },
    ]);
  }, []);

  return (
    <div className="mx-12">
      <NewThoughtModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(thought) => {
          console.log("New thought:", thought);
          setIsModalOpen(false);
        }}
      />
      <div className="md:flex md:flex-1 gap-12 bg-background">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-8 flex-1 pb-12 pt-6">
          <div className="text-2xl font-bold">Your Emoji Board</div>
          <div
            className="rounded-4xl bg-card"
            style={{ height: "calc(100vh - var(--navbar-height, 224px))" }}
          >
            <img
              src={emojiBoardImg}
              alt="Emoji Board"
              className="w-full h-full object-contain rounded-4xl"
            />
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-8 py-12 flex-1">
          <div className="text-2xl font-bold">Your Thoughts</div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {thoughtList.map((thought, index) => (
              <ThoughtCard
                title={thought.title}
                content={thought.content}
                date={thought.date}
                emoji={thought.emoji}
                response={thought.response}
                index={index}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = "Dashboard";
export default Dashboard;
