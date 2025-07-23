import Image from "next/image";

interface CardGalleryProps {
  image: string;
  icon: string;
  description: string;
}

export default function CardGallery({
  image,
  icon,
  description,
}: CardGalleryProps) {
  return (
    <div className="relative w-[550px] h-[350px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer transition-transform">
      {/* Gambar utama */}
      <Image
        src={image}
        alt="Gallery"
        fill
        className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
        quality={90}
        priority
      />
      {/* Overlay gradient & content (hanya saat hover) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-tosca/80 to-black/80 opacity-50" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Image
            src={icon}
            alt="Logo"
            width={120}
            height={120}
            className="mb-4 drop-shadow-lg"
            priority
          />
          <p className="text-white text-center text-lg font-medium max-w-[420px] drop-shadow-md">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
