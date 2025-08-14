"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect, ChangeEvent } from "react";
import { Regency, Address, District } from "../../types/user";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Address) => void;
  initialData?: Address;
}

export default function AddressModal({ isOpen, onClose, onSave, initialData }: AddressModalProps) {
  const { token } = useAuth();

  const [formData, setFormData] = useState<Address>({
    id: undefined,
    street: "",
    regency_id: undefined,
    district_id: undefined,
    regency: undefined,
    district: undefined,
  });
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoadingRegencies(true);
    fetch("https://angkutin.vercel.app/v1/regency", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRegencies(data.data))
      .catch(() => setError("Failed to load regencies"))
      .finally(() => setLoadingRegencies(false));
  }, [token]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.regency_id) {
        const selectedRegency = regencies.find((r) => r.id === initialData.regency_id);
        setDistricts(selectedRegency?.districts || []);
      }
    } else {
      setFormData({
        street: "",
        regency_id: undefined,
        district_id: undefined,
        regency: undefined,
        district: undefined,
        id: undefined,
      });
      setDistricts([]);
    }
  }, [initialData, regencies]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: ["regency_id", "district_id"].includes(name) ? (value ? Number(value) : undefined) : value,
      };
      if (name === "regency_id") {
        updated.district_id = undefined;
        const selectedRegency = regencies.find((r) => r.id === Number(value));
        setDistricts(selectedRegency?.districts || []);
      }
      return updated;
    });
  };

  const handleSubmit = () => {
    if (!formData.street || !formData.regency_id || !formData.district_id) {
      setError("Please fill all fields");
      return;
    }
    setError(null);
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-lg font-semibold text-[#016A70] mb-4">{initialData ? "Edit Address" : "Add Address"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-3">
          {/* Regency */}
          <select name="regency_id" value={formData.regency_id || ""} onChange={handleChange} className="w-full border p-2 rounded-lg text-slate-500 mt-2" disabled={loadingRegencies}>
            <option value="">Select City</option>
            {regencies.map((regency) => (
              <option key={regency.id} value={regency.id}>
                {regency.name}
              </option>
            ))}
          </select>
          {/* District */}
          <select name="district_id" value={formData.district_id || ""} onChange={handleChange} className="w-full border p-2 rounded-lg text-slate-500 mt-2" disabled={!formData.regency_id}>
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
          {/* Street */}
          <input type="text" name="street" placeholder="Street" value={formData.street || ""} onChange={handleChange} className="w-full border p-2 rounded-lg text-slate-500 mt-2" />
        </div>
        {/* Buttons */}
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onClose} className="text-slate-500">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-[#016A70] text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
