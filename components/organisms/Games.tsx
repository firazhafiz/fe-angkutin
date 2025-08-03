"use client";
import Image from "next/image";
import CheckLeaderboard from "../atoms/CheckLeaderboard";
import { useEffect, useState } from "react";

type EventType = {
  id: number;
  title: string;
  banner: string;
  description: string;
  start_date: string;
  end_date: string;
};

export default function Games() {
  const [eventData, setEventData] = useState<EventType>();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch("http://localhost:4000/v1/event");
        const data = await res.json();
        setEventData(data.data[0]);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };

    fetchEvent();
  }, []);

  if (!eventData) return <div className="text-center">Loading...</div>;

  return (
    <section className="w-full flex justify-center">
      <div className="flex gap-16">
        {/* Left Side - Poster Image */}
        <div className="w-[400px] h-auto">
          {eventData?.banner ? (
            <Image src={eventData.banner} alt={eventData.title || "Event Banner"} width={1080} height={1350} className="w-full h-auto rounded-lg shadow-xl" priority quality={100} />
          ) : (
            <div className="w-full h-[500px] bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 italic">Banner not available</div>
          )}

          {/* <Image src={eventData!.banner} alt={eventData.title} width={1080} height={1350} className="w-full h-auto rounded-lg shadow-xl" priority quality={100} /> */}
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-tosca leading-tight">{eventData.title}</h2>

            <p className="text-md max-w-md text-gray-600 leading-relaxed">{eventData.description}</p>

            <div className="text-lg text-gray-500 font-medium">
              {new Date(eventData.start_date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              -{" "}
              {new Date(eventData.end_date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>

            <div className="pt-4">
              <CheckLeaderboard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
