import CardLeaderboard from "../atoms/CardLeaderboard";
import { leaderboardData } from "../../data/cardLeaderboard";

export default function CardLeaderboardList() {
  // Get top 3 from leaderboardData
  const top3Data = leaderboardData.slice(0, 3).map((user, index) => ({
    rank: index + 1,
    name: user.name,
    image: user.image,
    totalWaste: `${user.totalWasteKg} Kg`,
    points: user.points,
  }));

  return (
    <div className="flex gap-4 justify-start">
      {top3Data.map((user) => (
        <CardLeaderboard
          key={user.rank}
          rank={user.rank}
          name={user.name}
          image={user.image}
          totalWaste={user.totalWaste}
          points={user.points}
        />
      ))}
    </div>
  );
}
