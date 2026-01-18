import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/dashboard/Navbar";

function App() {
  return (
    <>
      {/* <h1 className="text-3xl font-bold underline bg-background">Health Companion App</h1> */}
      <Navbar />
      <Dashboard />
    </>
  );
}

export default App;
