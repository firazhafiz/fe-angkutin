"use client";

import { useEffect, useState } from "react";
import CardTutorial from "../atoms/CardTutorial";

interface TutorialItem {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  created_at: string;
}

export default function CardTutorialList() {
  const [tutorials, setTutorials] = useState<TutorialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await fetch("https://angkutin.vercel.app/v1/tutorial"); // Ganti URL jika perlu
        const data = await res.json();
        console.log(data);
        setTutorials(data.data); // asumsi respons API punya bentuk { data: [...] }
      } catch (err) {
        console.error("Failed to fetch tutorials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading tutorials...</div>;

  return (
    <div className="w-full space-y-8">
      {tutorials.map((tutorial) => (
        <CardTutorial
          key={tutorial.id}
          id={tutorial.id}
          videoUrl={tutorial.videoUrl}
          title={tutorial.title}
          description={tutorial.description}
          created_at={tutorial.created_at}
        />
      ))}
    </div>
  );
}
