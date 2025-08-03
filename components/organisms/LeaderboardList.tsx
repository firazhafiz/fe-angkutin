import CardLeaderboardList from "../moleculs/CardLeaderboardList";
import ListLeaderboard from "../moleculs/ListLeaderboard";
import ProfileLeaderboard from "../moleculs/ProfileLeaderboard";

export default function LeaderboardList() {
  return (
    <div className="w-full flex justify-center">
      {/* Main Content */}
      <div className="flex gap-14">
        {/* Left Section - Title, Cards, and List (Vertikal) */}
        <div className="lg:col-span-3 space-y-6 bg-white rounded-lg p-10">
          {/* Header - Rata Kiri */}
          <div className="text-left">
            <h1 className="text-3xl font-bold text-[#016A70] mb-2">
              Leaderboard
            </h1>
            <p className="text-gray-600">
              Check your points and ranking to earn special rewards!
            </p>
          </div>

          {/* Top 3 Cards */}
          <div>
            <CardLeaderboardList />
          </div>

          {/* List Leaderboard */}
          <div>
            <ListLeaderboard />
          </div>
        </div>

        {/* Right Section - Profile */}
        <div className="lg:col-span-1">
          <ProfileLeaderboard />
        </div>
      </div>
    </div>
  );
}
