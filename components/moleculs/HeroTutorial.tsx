import Image from "next/image";

export default function HeroTutorial() {
  return (
    <section className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 px-4 md:px-0">
      {/* Left: Text Content */}
      <div className="flex flex-col items-start justify-center gap-4 sm:gap-6 md:gap-4 w-full md:w-1/2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-tosca">
          Learn How to Manage
          <br />
          Waste the Smart Way
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-full md:max-w-xl leading-relaxed">
          Discover waste management tutorials, zero-waste lifestyle tips, and sustainable recycling ideas that help you reduce household waste and live greener every day. Explore easy-to-follow guides and creative DIY solutions to reduce,
          reuse, and recycle from the comfort of your home.
        </p>
      </div>

      {/* Right: Tutorial Illustration */}
      <div className="flex items-center justify-center w-full md:w-1/2 mb-6 md:mb-0">
        <Image src="/assets/tutorial.svg" alt="Tutorial Illustration" width={400} height={400} className="w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto mx-auto" priority />
      </div>
    </section>
  );
}
