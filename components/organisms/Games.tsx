import Image from "next/image";
import CheckLeaderboard from "../atoms/CheckLeaderboard";
import { fetchEvent, EventType } from "../../lib/fetchEvent";

interface GamesProps {
  initialEventData?: EventType | null;
}

export default async function Games({ initialEventData }: GamesProps) {
  // Fetch event data on server-side
  const eventData = initialEventData || (await fetchEvent());

  if (!eventData) {
    return (
      <section className="w-full flex justify-center">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#016A70] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading event data...</p>
        </div>
      </section>
    );
  }

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
            <div className="w-full h-[500px] bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 italic">
              Banner not available
            </div>
          )}
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-tosca leading-tight">
              {eventData.title}
            </h2>

            <p className="text-md max-w-md text-gray-600 leading-relaxed">
              {eventData.description}
            </p>

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
