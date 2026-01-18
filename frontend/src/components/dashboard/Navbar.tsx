import { useLocation } from "react-router-dom";
import moodleSvg from "../../assets/moodle.svg";
import moodle2Svg from "../../assets/moodle2.svg";
import { PlusIcon } from "@heroicons/react/20/solid";

interface NavbarProps {
  onAddThought?: () => void;
}

export default function Navbar({ onAddThought }: NavbarProps) {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-background">
      {/* Left side - Logo and brand name */}
      <div className="flex items-center gap-3">
        <img src={moodle2Svg} alt="Moodle Mascot Logo" className="w-10 h-10" />
        <h1 className="text-3xl font-semibold text-gray-800">Moodlet</h1>
      </div>

      {/* Right side - Add New Thought button */}
      {location.pathname !== "/thought-analysis" && (
        <button
          onClick={onAddThought}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#79D2BC] text-gray-800 font-medium hover:bg-[#5fa89b] transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="hidden md:inline">Add New Thought</span>
        </button>
      )}
    </nav>
  );
}
