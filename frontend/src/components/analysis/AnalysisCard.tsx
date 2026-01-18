import React from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

type AnalysisCardProps = {
  color: ColorName;
  sentimentRating?: number;
  sentimentLabel?: string;
  icon?: React.ComponentType<any>;
  title: string;
  content?: string;
  listContent?: string[];
};

type ColorName = "green" | "yellow" | "purple";

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

export const AnalysisCard = ({
  color,
  sentimentRating,
  sentimentLabel,
  icon,
  title,
  content,
  listContent,
}: AnalysisCardProps) => {
  const playTTS = async (text: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/elevenlabs/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        console.error(
          "TTS request failed with status:",
          response.status,
          response.statusText,
        );
        throw new Error(
          `Failed to generate TTS: ${response.status} ${response.statusText}`,
        );
      }

      const audioBlob = new Blob([await response.arrayBuffer()], {
        type: "audio/mpeg",
      });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error playing TTS:", error);
    }
  };

  return (
    <div
      className={`flex flex-col w-full gap-4 rounded-2xl p-12 ${COLOR_MAP[color].base}`}
    >
      <div
        className={`flex flex-col w-full gap-4 rounded-2xl p-12 ${color && COLOR_MAP[color].base}`}
      >
        {sentimentRating && sentimentLabel && (
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 flex items-center justify-center font-bold text-2xl rounded-2xl bg-card-green/90">
              {sentimentRating}
            </div>
            <div className="font-black text-2xl">{sentimentLabel}</div>
          </div>
        )}

        <div className="flex gap-4 items-center">
          <div
            className={`w-12 h-12 flex items-center justify-center ${COLOR_MAP[color].dark} rounded-2xl`}
          >
            {icon &&
              React.createElement(icon, {
                className: "w-8 h-8 text-text-muted",
              })}
          </div>
          <div className="justify-between">
            <div className="text-2xl font-bold">{title}</div>

            <SpeakerWaveIcon
              onClick={() => content ? playTTS(content) : listContent ? playTTS(listContent.join(". ")) : null}
              className="h-6 w-6 text-gray-500"
            />
          </div>
        </div>
        {content && <div className="text-xl">{content}</div>}
        {listContent && (
          <ul className="text-xl">
            {listContent.map((listItem) => (
              <li className="list-disc list-inside">{listItem}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnalysisCard;
