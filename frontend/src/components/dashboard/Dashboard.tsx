const Dashboard = () => {
  return (
    <div className="flex flex-1 gap-2 bg-background">
      <div className="flex flex-col flex-1 p-4">
        {/* LEFT SIDE */}
        <h2>Your Emoji Board</h2>
        <div
          className="rounded-4xl bg-card"
          style={{ height: "calc(100vh - var(--navbar-height, 64px))" }}
        ></div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex flex-1">
        <h2>Your Thoughts</h2>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
