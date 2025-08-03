export interface LeaderboardItem {
  name: string;
  totalWasteKg: number;
  points: number;
  image: string;
}

export const leaderboardData: LeaderboardItem[] = [
  {
    name: "Rina Sari",
    totalWasteKg: 45.5,
    points: 910,
    image: "/images/consultant1.jpg",
  },
  {
    name: "Budi Hartono",
    totalWasteKg: 38.2,
    points: 764,
    image: "/images/consultant2.jpg",
  },
  {
    name: "Citra Dewi",
    totalWasteKg: 29.8,
    points: 596,
    image: "/images/consultant3.jpg",
  },
  {
    name: "Ahmad Yani",
    totalWasteKg: 25.1,
    points: 502,
    image: "/images/consultant1.jpg",
  },
  {
    name: "Lina Permata",
    totalWasteKg: 20.7,
    points: 414,
    image: "/images/consultant2.jpg",
  },
  {
    name: "Joko Susilo",
    totalWasteKg: 18.9,
    points: 378,
    image: "/images/consultant3.jpg",
  },
  {
    name: "Dedi Kusuma",
    totalWasteKg: 15.3,
    points: 306,
    image: "/images/consultant1.jpg",
  },
  {
    name: "Indah Lestari",
    totalWasteKg: 12.6,
    points: 252,
    image: "/images/consultant2.jpg",
  },
  {
    name: "Fajar Rahman",
    totalWasteKg: 10.4,
    points: 208,
    image: "/images/consultant3.jpg",
  },
  {
    name: "Mira Andini",
    totalWasteKg: 8.9,
    points: 178,
    image: "/images/consultant1.jpg",
  },
  {
    name: "Hadi Wijaya",
    totalWasteKg: 7.2,
    points: 144,
    image: "/images/consultant2.jpg",
  },
];

export default leaderboardData;
