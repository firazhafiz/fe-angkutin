import Image from "next/image";

export default function Promote() {
  return (
    <section className="w-full flex justify-center items-center">
      <div className="relative w-[1240px] h-[585px] bg-gradient-to-br from-tosca to-[#3ad1c6] rounded-[32px] overflow-hidden flex items-start py-14 px-12">
        {/* Kiri: Title, Desc, Button */}
        <div className="flex-1 flex flex-col items-start z-10">
          <h2 className="text-gray-100 text-4xl md:text-5xl font-extrabold font-fredoka mb-6 max-w-xl leading-tight">
            Laziness is no excuse for littering carelessly.
          </h2>
          <p className="text-gray-100 text-lg mb-8 max-w-lg leading-tight font-light">
            Too busy? Relax, you can still tackle piled up waste at home without
            leaving. We&apos;re ready to serve you anytime.
          </p>
          <a
            href="#order"
            className="px-8 py-3 rounded-full bg-black-100 text-white text-lg font-semibold shadow hover:bg-gray-900 transition-colors"
          >
            Order Now
          </a>
        </div>
        {/* Gambar women-trash di kanan */}
        <div className="absolute right-0 bottom-[-200px] z-20">
          <Image
            src="/assets/women-trash.svg"
            alt="Women Trash"
            width={550}
            height={500}
            className="object-contain"
            priority
          />
        </div>
        {/* Gambar rumput daun di bawah kiri */}
        <div className="absolute left-0 bottom-[-20px] z-20">
          <Image
            src="/assets/rumputdaun.svg"
            alt="Rumput Daun"
            width={400}
            height={120}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
