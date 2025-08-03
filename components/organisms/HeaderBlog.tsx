import Image from "next/image";
import { FaGlobe } from "react-icons/fa";

export default function HeaderBlog() {
  return (
    <section className="w-full flex justify-center items-center">
      <div className="relative w-[1160px] h-[480px] rounded-3xl overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/blog-hero.jpg"
          alt="Blog Hero"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 p-12 text-white">
          {/* Title with Earth Icon */}
          <div className="flex items-center gap-3 mb-4">
            <FaGlobe className="text-2xl text-gray-100" />
            <h1 className="text-xl md:text-2xl font-bold">
              Towards a Cleaner Future
            </h1>
          </div>

          {/* Subtitle */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100">
            Say No to Plastic, Save the Planet
          </h2>

          {/* Description */}
          <p className="text-md font-light max-w-2xl leading-relaxed text-gray-200">
            Let&apos;s work together to stop using single-use plastics. Every
            small step you take today brings great change for tomorrow&apos;s
            earth.
          </p>
        </div>
      </div>
    </section>
  );
}
