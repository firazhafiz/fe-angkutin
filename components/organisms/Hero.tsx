import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full flex items-center justify-between gap-8 md:gap-16 relative overflow-visible">
      {/* Left: Text & CTA */}
      <div className="flex flex-col items-start justify-center gap-6 md:gap-2 relative">
        <h3 className="text-black-100 text-lg md:text-xl lg:text-2xl font-medium">
          Hi, Folks!
        </h3>
        <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold leading-tight text-tosca font-fredoka">
          Inovation Dedication
          <br />
          and Sustainable Solution
        </h1>
        <div className="flex flex-col gap-20 relative">
          <p className="text-base md:text-md lg:text-lg text-black-100 max-w-xl">
            Our web platform transforms waste management with innovative,
            sustainable solutions. Streamlining collection and recycling, it
            fosters a greener future through advanced technology and dedicated
            eco-friendly practices.
          </p>
          <a
            href="#order"
            className="w-fit px-8 py-3 rounded-sm bg-tosca text-white text-md font-semibold shadow hover:bg-[#018b8f] transition-colors relative z-10"
          >
            Order Now
          </a>
          {/* Daun dan Daun Blur Dekorasi */}
          <Image
            src="/assets/daun.png"
            alt="Daun Dekorasi"
            width={100}
            height={100}
            className="absolute left-[-200px] bottom-[-40px] rotate-[-15deg] z-0"
          />
          <Image
            src="/assets/daunblur.svg"
            alt="Daun Blur Dekorasi"
            width={100}
            height={100}
            className="absolute left-[-200px] bottom-0 z-0"
          />
        </div>
      </div>
      {/* Right: Hero Image */}
      <div className="flex items-center justify-end relative">
        <Image
          src="/assets/trash-hero.svg"
          alt="Hero Trash Illustration"
          width={200}
          height={200}
          className="w-[365px] h-auto"
          priority
        />
        {/* Ranting Dekorasi */}
        <Image
          src="/assets/ranting.png"
          alt="Ranting Dekorasi"
          width={130}
          height={130}
          className="absolute right-[-220px] top-1/4 -translate-y-1/2 hidden md:block z-0"
        />
      </div>
    </section>
  );
}
