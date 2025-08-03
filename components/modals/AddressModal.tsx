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
  city: string;
  district: string;
  street: string;
}

export default function AddressModal({ isOpen, onClose, onSave, initialData }: AddressModalProps) {
  const [formData, setFormData] = useState<Address>({
    city: "",
    district: "",
    street: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ city: "", district: "", street: "" });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded-lg text-slate-500 mt-2" />
          <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} className="w-full border p-2 rounded-lg  text-slate-500 mt-2" />
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
