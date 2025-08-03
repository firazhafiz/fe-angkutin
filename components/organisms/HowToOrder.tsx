import Image from "next/image";

const steps = [
  "Request an order driver to pickup your waste.",
  "Provide waste data to be collected.",
  "Enter the pickup location address.",
  "Enjoy and wait for the driver to arrive.",
];

export default function HowToOrder() {
  return (
    <section className="relative w-full flex justify-center items-center py-24 bg-tosca rounded-t-[60px] rounded-b-none overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <Image
          src="/assets/texture.svg"
          alt="texture"
          fill
          className="object-cover object-left opacity-3"
          priority
        />
      </div>
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
        {/* Left: Logo, Title, Desc, Button */}
        <div className="flex-1 flex flex-col items-start justify-center gap-6 max-w-md">
          <Image
            src="/assets/angkutin_white.png"
            alt="Angkutin Logo"
            width={120}
            height={120}
            className="mb-2"
            priority
          />
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-2">
            How to Order
          </h2>
          <p className="text-gray-100 font-light text-lg mb-4">
            Confused by piling waste? Relax, we&apos;ll handle the pickup.
          </p>
          <a
            href="#order"
            className="mt-2 px-8 py-3 rounded-full bg-white text-tosca text-lg font-semibold shadow hover:bg-gray-100 transition-colors"
          >
            Order Now
          </a>
        </div>
        {/* Right: Steps */}
        <div className="flex-1 flex flex-col gap-6 w-full max-w-lg">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-white rounded-full px-6 py-4 shadow-md text-lg font-medium"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-tosca text-white font-bold text-lg">
                {idx + 1}
              </span>
              <span className="text-black/90 font-medium text-base md:text-lg">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
