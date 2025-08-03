"use client";
import { useState } from "react";
import CategoryConsultant from "../atoms/CategoryConsultant";
import { consultantData } from "../../data/consultantData";
import { useConsultant } from "../../contexts/ConsultantContext";

export default function CategoryConsultantList() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const { selectedCategoryIndex, setSelectedCategoryIndex } = useConsultant();

  // Get unique categories from consultantData
  const categories = consultantData.map((consultants, index) => ({
    id: index,
    name: consultants[0].category.name,
    image: consultants[0].category.image,
    consultantCount: consultants.length,
  }));

  const handleCategoryClick = (index: number) => {
    setSelectedCategoryIndex(index);
  };

  return (
    <div className="mt-8 flex flex-col gap-4">
      {categories.map((category, index) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(index)}
          className="cursor-pointer"
        >
          <CategoryConsultant
            image={category.image}
            name={category.name}
            consultantCount={category.consultantCount}
            isHovered={hoveredCategory === index}
            isSelected={selectedCategoryIndex === index}
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(null)}
          />
        </div>
      ))}
    </div>
  );
}
