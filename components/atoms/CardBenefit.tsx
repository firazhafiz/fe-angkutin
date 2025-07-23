import Image from "next/image";

interface CardBenefitProps {
  image: string;
  title: string;
  description: string;
}

export default function CardBenefit({
  image,
  title,
  description,
}: CardBenefitProps) {
  return (
    <div className="relative w-[390px] h-[520px] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-end group transition-transform hover:-translate-y-2 hover:shadow-2xl">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center w-full h-full"
        quality={90}
        priority
      />
      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
      <div className="relative z-20 p-8 pb-10 flex flex-col items-center justify-end h-full">
        <h3 className="text-xl font-extrabold text-white text-center mb-2 drop-shadow-lg">
          {title}
        </h3>
        <p className="text-gray-100 text-center text-base font-light drop-shadow-md max-w-xs">
          {description}
        </p>
      </div>
    </div>
  );
}
