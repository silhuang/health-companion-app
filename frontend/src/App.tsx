import { Route, Routes } from "react-router-dom";
import Analysis from "./components/analysis/Analysis";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/dashboard/Navbar";

function App() {
  return (
    <div className="bg-background h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/thought-analysis" element={<Analysis />} />
      </Routes>
    </div>
  );
}

export default App;
