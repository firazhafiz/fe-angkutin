import Image from "next/image";

interface CardLeaderboardProps {
  rank: number;
  name: string;
  image: string;
  totalWaste: string;
  points: number;
}

export default function CardLeaderboard({
  rank,
  name,
  image,
  totalWaste,
  points,
}: CardLeaderboardProps) {
  return (
    <div className="w-[200px] h-[240px] bg-white border border-black rounded-lg p-4 flex flex-col items-center">
      {/* User Image */}
      <div className="mb-3">
        <Image
          src={image}
          alt={name}
          width={60}
          height={60}
          className="w-15 h-15 rounded-full object-cover"
        />
      </div>

      {/* Rank and Name */}
      <div className="text-center mb-2">
        <h3 className="font-semibold text-gray-900">
          {rank}. {name}
        </h3>
      </div>

      {/* Total Waste */}
      <div className="text-center mb-1">
        <p className="text-xs text-gray-500">Total Waste</p>
        <p className="text-sm font-medium text-gray-700">{totalWaste}</p>
      </div>

      {/* Points */}
      <div className="text-center mt-auto">
        <p className="text-lg font-bold text-[#016A70]">{points} points</p>
      </div>
    </div>
  );
}
