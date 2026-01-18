import { Route, Routes } from "react-router-dom";
import Analysis from "./components/analysis/Analysis";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/dashboard/Navbar";
import NewThoughtModal from "./components/dashboard/NewThoughtModal";
import { useRef, useState } from "react";

function App() {
  const dashboardRef = useRef<{ openModal: () => void }>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline bg-background">Health Companion App</h1> */}
      <div className={`bg-background h-screen ${isModalOpen ? "blur-sm" : ""}`}>
        <Navbar onAddThought={() => setIsModalOpen(true)} />
        <Routes>
          <Route path="/" element={<Dashboard ref={dashboardRef} />} />
          <Route path="/thought-analysis" element={<Analysis />} />
        </Routes>
      </div>
      <NewThoughtModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(thought) => {
          console.log("New thought:", thought);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}

export default App;
