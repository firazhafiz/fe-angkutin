import Image from "next/image";
import CheckLeaderboard from "../atoms/CheckLeaderboard";
import { contestContentData } from "../../data/contestGame";

export default function Games() {
  return (
    <section className="w-full">
      <div>
        <div>
          <div className=" flex gap-16">
            {/* Left Side - Poster Image */}
            <div>
              <div className=" w-[400px] h-auto">
                <Image
                  src={contestContentData.image}
                  alt="Angkut.in Monthly Eco-Challenge Poster"
                  width={1080}
                  height={1350}
                  className="w-full h-auto rounded-lg shadow-xl"
                  priority
                  quality={100}
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col">
              <div className="space-y-6">
                {/* Title */}
                <h2 className="text-3xl lg:text-4xl font-bold text-tosca leading-tight">
                  {contestContentData.title}
                </h2>

                {/* Description */}
                <p className="text-md text-gray-600 leading-relaxed">
                  {contestContentData.description}
                </p>

                {/* Date */}
                <div className="text-lg text-gray-500 font-medium">
                  {contestContentData.date}
                </div>

                {/* Button */}
                <div className="pt-4">
                  <CheckLeaderboard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
