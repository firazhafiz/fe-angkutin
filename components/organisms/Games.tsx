"use client";

import Image from "next/image";
import CheckLeaderboard from "../atoms/CheckLeaderboard";
import { useEffect, useState } from "react";
import { EventType } from "../../lib/fetchEvent";

interface GamesProps {
  initialEventData?: EventType | null;
}

export default function Games({ initialEventData }: GamesProps) {
  const [eventData, setEventData] = useState<EventType | null>(
    initialEventData || null
  );
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
    <section className="w-full flex justify-center">
      <div className="flex gap-16">
        {/* Left Side - Poster Image */}
        <div className="w-[400px] h-auto">
          {eventData?.banner ? (
            <Image
              src={eventData.banner}
              alt={eventData.title || "Event Banner"}
              width={1080}
              height={1350}
              className="w-full h-auto rounded-lg shadow-xl"
              priority
              quality={100}
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded-lg animate-pulse"></div>
          )}
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-tosca leading-tight">
              {eventData?.title || (
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              )}
            </h2>

            <p className="text-md max-w-md text-gray-600 leading-relaxed">
              {eventData?.description || (
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              )}
            </p>

            <div className="text-lg text-gray-500 font-medium">
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

            <div className="pt-4">
              {eventData ? (
                <CheckLeaderboard />
              ) : (
                <div className="h-12 bg-gray-200 rounded-md animate-pulse w-48"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
