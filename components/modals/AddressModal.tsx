// components/modals/AddressModal.tsx

"use client";

import { useState, useEffect } from "react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Address) => void;
  initialData?: Address;
}

export interface Address {
  id?: number;
  user_id?: number;
  street: string;
  regency?: {
    id: number;
    name: string;
  };
  district?: {
    id: number;
    name: string;
    regency_id: number;
  };
}

export default function AddressModal({ isOpen, onClose, onSave, initialData }: AddressModalProps) {
  const [formData, setFormData] = useState<Address>({
    street: "",
    regency: undefined,
    district: undefined,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        street: "",
        regency: undefined,
        district: undefined,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "regency") {
      setFormData((prev) => ({
        ...prev,
        regency: {
          id: 0, // You might want to get this from a dropdown or API
          name: value,
        },
      }));
    } else if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        district: {
          id: 0, // You might want to get this from a dropdown or API
          name: value,
          regency_id: prev.regency?.id || 0,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[650px] shadow-lg">
        <h2 className="text-lg font-semibold text-[#016A70] mb-4">{initialData ? "Edit Address" : "Add Address"}</h2>
        <div className="space-y-3">
          <input type="text" name="regency" placeholder="City" value={formData.regency?.name || ""} onChange={handleChange} className="w-full border p-2 rounded-lg text-slate-500 mt-2" />
          <input type="text" name="district" placeholder="District" value={formData.district?.name || ""} onChange={handleChange} className="w-full border p-2 rounded-lg text-slate-500 mt-2" />
          <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} className="w-full border p-2 rounded-lg text-slate-500 mt-2" />
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onClose} className="text-slate-500 cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-[#016A70] text-white px-4 py-2 rounded cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
