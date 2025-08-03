"use client";
import { useRouter } from "next/navigation";
import CardConsultant from "../atoms/CardConsultant";
import { consultantData } from "../../data/consultantData";
import { useConsultant } from "../../contexts/ConsultantContext";

export default function CardConsultantList() {
  const router = useRouter();
  const { selectedCategoryIndex } = useConsultant();

  const consultants = consultantData[selectedCategoryIndex] || [];

  const handleDetailClick = (consultantIndex: number) => {
    router.push(`/consultant/${selectedCategoryIndex}-${consultantIndex}`);
  };

  return (
    <div className="mt-8 flex flex-col gap-6">
      {consultants.map((consultant, index) => (
        <CardConsultant
          key={index}
          image={consultant.image}
          name={consultant.name}
          category={consultant.category.name}
          onDetailClick={() => handleDetailClick(index)}
        />
      ))}
    </div>
  );
}
