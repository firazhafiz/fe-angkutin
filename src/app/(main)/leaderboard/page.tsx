import LeaderboardList from "../../../../components/organisms/LeaderboardList";

export default function LeaderboardPage() {
  return (
    <main className="w-full h-full relative min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full max-w-8xl mx-auto mt-40 mb-20">
        <LeaderboardList />
      </div>
    </main>
  );
}
