import Image from "next/image";

export default function HeroTutorial() {
  return (
    <section className="w-full flex items-center justify-between gap-8 md:gap-16">
      {/* Left: Text Content */}
      <div className="flex flex-col items-start justify-center gap-6 md:gap-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-tosca">
          Learn How to Manage
          <br />
          Waste the Smart Way
        </h1>
        <p className="text-base md:text-md lg:text-lg text-gray-700 max-w-xl leading-relaxed">
          Discover waste management tutorials, zero-waste lifestyle tips, and
          sustainable recycling ideas that help you reduce household waste and
          live greener every day. Explore easy-to-follow guides and creative DIY
          solutions to reduce, reuse, and recycle from the comfort of your home.
        </p>
      </div>

      {/* Right: Tutorial Illustration */}
      <div className="flex items-center justify-end">
        <Image
          src="/assets/tutorial.svg"
          alt="Tutorial Illustration"
          width={400}
          height={400}
          className="w-[400px] h-auto"
          priority
        />
      </div>
    </section>
  );
}
