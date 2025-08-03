"use client";

import { useState } from "react";

interface UserData {
  name: string;
  phone: string;
}

interface FormData {
  name: string;
  phone: string;
  provinsi: string;
  city: string;
  streetAddress: string;
  detailLainnya: string;
}

interface NewAddressProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (addressData: FormData) => void;
  userData: UserData;
}

export default function NewAddress({
  isOpen,
  onClose,
  onConfirm,
  userData,
}: NewAddressProps) {
  const [formData, setFormData] = useState<FormData>({
    name: userData.name,
    phone: userData.phone,
    provinsi: "",
    city: "",
    streetAddress: "",
    detailLainnya: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = () => {
    onConfirm(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      style={{
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-black-100">New Address</h2>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-4">
          {/* First Row - Name and Phone */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.name}
              disabled
              className="w-full px-3 py-3 border text-sm text-gray-500 bg-gray-100 border-gray-300 rounded-md focus:outline-none"
              placeholder="Firaz Fulvian Hafiz"
            />
            <input
              type="text"
              value={formData.phone}
              disabled
              className="w-full px-3 py-3 border text-sm text-gray-500 bg-gray-100 border-gray-300 rounded-md focus:outline-none"
              placeholder="Phone Number"
            />
          </div>

          {/* Second Row - Provinsi and City */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.provinsi}
              onChange={(e) => handleInputChange("provinsi", e.target.value)}
              className="w-full px-3 py-3 border text-sm text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent"
              placeholder="Provinsi"
            />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="w-full px-3 py-3 border text-sm text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent"
              placeholder="City"
            />
          </div>

          {/* Third Row - Street Address */}
          <textarea
            value={formData.streetAddress}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
            placeholder="Nama Jalan, Gedung, Kecamatan, No Rumah"
            rows={3}
            className="w-full px-3 py-3 border text-sm text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent resize-none"
          />

          {/* Fourth Row - Detail Lainnya */}
          <textarea
            value={formData.detailLainnya}
            onChange={(e) => handleInputChange("detailLainnya", e.target.value)}
            placeholder="Detail Lainnya"
            rows={3}
            className="w-full px-3 py-3 border text-sm text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent resize-none"
          />
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 flex-shrink-0">
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-[#FF5656] text-white rounded-md hover:bg-red-400 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="py-2 px-4 bg-tosca text-white rounded-md hover:bg-tosca/90 transition-colors text-sm"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
