import Image from "next/image";
import { ConsultantCategory } from "../../types/user";

interface CategoryConsultantProps {
  consultantCategory: ConsultantCategory;
  isHovered: boolean;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function CategoryConsultant({ consultantCategory, isHovered, isSelected, onMouseEnter, onMouseLeave }: CategoryConsultantProps) {
  return (
    <div className={`relative transition-all duration-300 ease-in-out`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Image src={consultantCategory.thumbnail || ""} alt={`${name} category`} width={500} height={500} className={`rounded-xl h-32 w-full object-cover ${!isHovered && !isSelected ? "grayscale" : ""}`} />
      <div className="absolute bottom-2 left-2">
        <h3 className="font-semibold">{consultantCategory.name}</h3>
        <p className="text-xs text-slate-300">{consultantCategory._count?.users} Consultant</p>
      </div>
    </div>
  );
}
