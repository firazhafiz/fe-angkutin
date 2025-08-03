import Image from "next/image";

interface ListLeaderboardModelProps {
  rank: number;
  name: string;
  image: string;
  totalWaste: string;
  points: number;
}

export default function ListLeaderboardModel({
  rank,
  name,
  image,
  totalWaste,
  points,
}: ListLeaderboardModelProps) {
  return (
    <div className="w-[630px] flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
      {/* Rank */}
      <div className="w-8 text-center">
        <span className="font-semibold text-gray-700">{rank}.</span>
      </div>

      {/* User Image */}
      <div className="flex items-center gap-3 flex-1">
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* Name and Total Waste */}
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{totalWaste}</p>
        </div>
      </div>

      {/* Points */}
      <div className="text-right">
        <p className="font-semibold text-[#016A70]">{points} points</p>
      </div>
    </div>
  );
}
