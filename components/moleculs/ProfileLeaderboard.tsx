import CardLeaderboard from "../atoms/CardLeaderboard";
import { leaderboardData } from "../../data/cardLeaderboard";

export default function ProfileLeaderboard() {
  // Get the last user from leaderboardData (rank 11)
  const lastUser = leaderboardData[leaderboardData.length - 1];

  const profileData = {
    rank: leaderboardData.length, // Rank 11
    name: lastUser.name,
    image: lastUser.image,
    totalWaste: `${lastUser.totalWasteKg} Kg`,
    points: lastUser.points,
  };

  return (
    <div className="flex justify-center">
      <CardLeaderboard
        rank={profileData.rank}
        name={profileData.name}
        image={profileData.image}
        totalWaste={profileData.totalWaste}
        points={profileData.points}
      />
    </div>
  );
}
