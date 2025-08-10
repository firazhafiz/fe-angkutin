"use client";

import Image from "next/image";
import CheckLeaderboard from "../atoms/CheckLeaderboard";
import { useEffect, useState } from "react";
import { EventType } from "../../lib/fetchEvent";

interface GamesProps {
  initialEventData?: EventType | null;
}

export default function Games({ initialEventData }: GamesProps) {
  const [eventData, setEventData] = useState<EventType | null>(initialEventData || null);
  const [loading, setLoading] = useState(!initialEventData);

  useEffect(() => {
    // Only fetch if we don't have initial data
    if (!initialEventData) {
      const fetchEventData = async () => {
        try {
          setLoading(true);
          const res = await fetch("https://angkutin.vercel.app/v1/event");
          const data = await res.json();
          setEventData(data.data[0] || null);
        } catch (error) {
          console.error("Failed to fetch event:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEventData();
    }
  }, [initialEventData]);

  return (
    <section className="w-full flex justify-center px-4 md:px-0">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full max-w-5xl">
        {/* Left Side - Poster Image */}
        <div className="w-full lg:w-[400px] h-[220px] sm:h-[300px] lg:h-auto mb-6 lg:mb-0 flex-shrink-0">
          {eventData?.banner ? (
            <Image src={eventData.banner} alt={eventData.title || "Event Banner"} width={1080} height={1350} className="w-full h-full lg:h-auto rounded-lg shadow-xl object-cover" priority quality={100} />
          ) : (
            <div className="w-full h-full min-h-[220px] sm:min-h-[300px] lg:min-h-[400px] bg-gray-200 rounded-lg animate-pulse"></div>
          )}
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col justify-center w-full">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-tosca leading-tight">{eventData?.title || <div className="h-8 bg-gray-200 rounded animate-pulse"></div>}</h2>

            <div className="text-sm sm:text-md max-w-full sm:max-w-md text-gray-600 leading-relaxed">
              {eventData?.description || (
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              )}
            </div>

            <div className="text-base sm:text-lg text-gray-500 font-medium">
              {eventData ? (
                <>
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
                </>
              ) : (
                <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
              )}
            </div>

            <div className="pt-2 sm:pt-4">{eventData ? <CheckLeaderboard /> : <div className="h-12 bg-gray-200 rounded-md animate-pulse w-48"></div>}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
