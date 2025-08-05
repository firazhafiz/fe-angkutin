"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useConsultant } from "../../contexts/ConsultantContext";

export default function CardConsultantList() {
  const router = useRouter();
  const { selectedCategoryIndex, consultants, loading, error, categories, createConsultation } = useConsultant();
  const [isCreatingConsultation, setIsCreatingConsultation] = useState<number | null>(null);

  const selectedCategory = categories[selectedCategoryIndex];

  const handleDetailClick = (consultantId: number) => {
    router.push(`/consultant/${consultantId}`);
  };

  const handleConsultationClick = async (consultantId: number) => {
    if (isCreatingConsultation) return; // Prevent multiple clicks

    setIsCreatingConsultation(consultantId);
    try {
      const consultation = await createConsultation(consultantId);
      if (consultation) {
        // Navigate to chat or consultation page
        router.push(`/message?consultation_id=${consultation.id}`);
      }
    } finally {
      setIsCreatingConsultation(null);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 flex flex-col gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded-lg"></div>
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

  if (consultants.length === 0) {
    return (
      <div className="mt-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">👨‍💼</div>
        <p className="text-gray-500 text-lg">{selectedCategory ? `No consultants found in ${selectedCategory.name}` : "No consultants found"}</p>
        <p className="text-gray-400 text-sm mt-2">Try selecting a different category</p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-6">
      {consultants.map((consultant) => (
        <div key={consultant.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                {consultant.avatar ? <img src={consultant.avatar} alt={consultant.name} className="w-12 h-12 rounded-full object-cover" /> : <span className="text-gray-500 text-lg">{consultant.name.charAt(0).toUpperCase()}</span>}
              </div>
              <div>
                <h3 className="font-semibold text-[#016A70]">{consultant.name}</h3>
                <p className="text-sm text-gray-500">{consultant.category?.name || "No Category"}</p>
                {consultant.specialization && <p className="text-xs text-gray-400">{consultant.specialization}</p>}
                {consultant.rating && (
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-sm text-gray-600 ml-1">{consultant.rating}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleDetailClick(consultant.id)} className="px-3 py-1 text-sm text-[#016A70] border border-[#016A70] rounded hover:bg-[#016A70] hover:text-white transition-colors">
                Detail
              </button>
              <button
                onClick={() => handleConsultationClick(consultant.id)}
                disabled={isCreatingConsultation === consultant.id}
                className="px-3 py-1 text-sm bg-[#016A70] text-white rounded hover:bg-[#015a5f] transition-colors disabled:opacity-50">
                {isCreatingConsultation === consultant.id ? "Creating..." : "Consult"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
