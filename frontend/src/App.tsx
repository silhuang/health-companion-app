import Analysis from "./components/analysis/Analysis";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/dashboard/Navbar";

function App() {
  return (
    <div className="bg-background h-screen">
      <Navbar />
      {/* <Dashboard /> */}
      <Analysis />
    </div>
  );
}

export default App;
