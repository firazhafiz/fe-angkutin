"use client";
import { useState } from "react";
import WasteDataForm from "../atoms/WasteDataForm";
import Link from "next/link";

export default function WasteData() {
  const [formData, setFormData] = useState<{
    weight: string;
    wasteType: string[];
  } | null>(null);

  const handleSubmit = (data: { weight: string; wasteType: string[] }) => {
    setFormData(data);
    console.log("Waste data submitted:", data);
    // Here you can add API call or other logic
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#016A70] mb-2">
          Complete your Waste Data
        </h2>
        <p className="text-gray-600 text-sm">
          Fill the weight and waste type form
        </p>
      </div>

      {/* Form */}
      <WasteDataForm onSubmit={handleSubmit} />

      {/* Submit Button */}
      <div className="mt-6">
        <Link href="/order/success">
          <button
            type="submit"
            className="w-full bg-[#016A70] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#015a60] transition-colors duration-200"
          >
            Submit
          </button>
        </Link>
      </div>

      {/* Display submitted data (optional) */}
      {formData && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Submitted: {formData.weight} kg of {formData.wasteType.join(", ")}{" "}
            waste
          </p>
        </div>
      )}
    </div>
  );
}
