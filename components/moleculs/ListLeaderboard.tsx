import ListLeaderboardModel from "../atoms/ListLeaderboardModel";
import { leaderboardData } from "../../data/cardLeaderboard";

export default function ListLeaderboard() {
  // Get rank 4-10 from leaderboardData
  const listData = leaderboardData.slice(3, 10).map((user, index) => ({
    rank: index + 4, // Start from rank 4
    name: user.name,
    image: user.image,
    totalWaste: `${user.totalWasteKg} Kg`,
    points: user.points,
  }));

  return (
    <div className="space-y-2">
      {listData.map((user) => (
        <ListLeaderboardModel
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
