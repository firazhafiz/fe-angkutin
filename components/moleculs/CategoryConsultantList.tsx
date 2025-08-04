"use client";
import { useState } from "react";
import CategoryConsultant from "../atoms/CategoryConsultant";
import { useConsultant } from "../../contexts/ConsultantContext";

export default function CategoryConsultantList() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const { selectedCategoryIndex, setSelectedCategoryIndex, categories, loading, error } = useConsultant();

  const handleCategoryClick = (index: number) => {
    setSelectedCategoryIndex(index);
  };

  if (loading) {
    return (
      <div className="mt-8 flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-sm">{error}</p>
        <button onClick={() => window.location.reload()} className="text-red-500 text-xs mt-2 hover:underline">
          Try again
        </button>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="mt-8 text-center">
        <div className="text-gray-400 text-4xl mb-2">👥</div>
        <p className="text-gray-500 text-sm">No categories found</p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
      {categories.map((category, index) => (
        <div key={category.id} onClick={() => handleCategoryClick(index)} className="cursor-pointer">
          <CategoryConsultant
            image={category.image || "/images/default-category.png"}
            name={category.name}
            consultantCount={category.consultantCount || 0}
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
