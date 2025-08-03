"use client";
import { useState } from "react";

interface WasteDataFormProps {
  onSubmit: (data: { weight: string; wasteType: string[] }) => void;
}

export default function WasteDataForm({ onSubmit }: WasteDataFormProps) {
  const [weight, setWeight] = useState("");
  const [wasteTypes, setWasteTypes] = useState<string[]>([]);

  const handleWasteTypeChange = (wasteType: string) => {
    setWasteTypes((prev) =>
      prev.includes(wasteType)
        ? prev.filter((type) => type !== wasteType)
        : [...prev, wasteType]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight && wasteTypes.length > 0) {
      onSubmit({ weight, wasteType: wasteTypes });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Weight Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Weight
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="flex-1 text-black-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent"
            placeholder="Enter weight"
            required
          />
          <span className="text-gray-500 text-sm">In Kg</span>
        </div>
      </div>

      {/* Waste Type Checkbox Options */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Waste Type
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              value="organic"
              checked={wasteTypes.includes("organic")}
              onChange={() => handleWasteTypeChange("organic")}
              className="w-4 h-4 text-tosca focus:ring-tosca rounded"
            />
            <span className="text-gray-900">Organic</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              value="anorganic"
              checked={wasteTypes.includes("anorganic")}
              onChange={() => handleWasteTypeChange("anorganic")}
              className="w-4 h-4 text-tosca focus:ring-tosca rounded"
            />
            <span className="text-gray-900">Anorganic</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              value="electronic"
              checked={wasteTypes.includes("electronic")}
              onChange={() => handleWasteTypeChange("electronic")}
              className="w-4 h-4 text-tosca focus:ring-tosca rounded"
            />
            <span className="text-gray-900">Electronic</span>
          </label>
        </div>
      </div>
    </form>
  );
}
