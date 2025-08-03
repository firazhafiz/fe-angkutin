import Image from "next/image";

interface CategoryConsultantProps {
  image: string;
  name: string;
  consultantCount: number;
  isHovered: boolean;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function CategoryConsultant({
  image,
  name,
  consultantCount,
  isHovered,
  isSelected,
  onMouseEnter,
  onMouseLeave,
}: CategoryConsultantProps) {
  return (
    <div
      className={`relative transition-all duration-300 ease-in-out`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Image
        src={image}
        alt={`${name} category`}
        width={500}
        height={500}
        className={`rounded-xl h-32 w-full object-cover ${
          !isHovered && !isSelected ? "grayscale" : ""
        }`}
      />
      <div className="absolute bottom-2 left-2">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-xs text-slate-300">{consultantCount} Consultant</p>
      </div>
    </div>
  );
}
