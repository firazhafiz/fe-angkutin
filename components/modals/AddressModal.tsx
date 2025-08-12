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

  const [formData, setFormData] = useState<Partial<Address>>({
    street: "",
    regency_id: undefined,
    district_id: undefined,
  });

  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Fetch regencies beserta districts */
  const fetchRegencies = async () => {
    try {
      setLoadingRegencies(true);
      if (!token) throw new Error("No authentication token found");

      const res = await fetch("https://angkutin.vercel.app/v1/regency", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch regencies");

      const result = await res.json();
      if (Array.isArray(result.data)) {
        setRegencies(result.data); // tiap regency sudah punya districts
      } else {
        throw new Error("Invalid regency data format");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load regencies");
    } finally {
      setLoadingRegencies(false);
    }
  };

  /** Load data saat modal dibuka */
  useEffect(() => {
    if (isOpen) {
      fetchRegencies();
    }
  }, [isOpen, token]);

  /** Set form data dari initialData */
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        street: initialData.street || "",
        regency_id: initialData.regency_id,
        district_id: initialData.district_id,
      });

      const selectedRegency = regencies.find((r) => r.id === initialData.regency_id);
      setDistricts(selectedRegency?.districts || []);
    } else {
      setFormData({
        street: "",
        regency_id: undefined,
        district_id: undefined,
      });
      setDistricts([]);
    }
  }, [initialData, regencies]);

  // hanndle changes district by regency
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    console.log("handleChange", { name, value });

    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [name]: ["regency_id", "district_id"].includes(name) ? (value ? Number(value) : undefined) : value,
      };

      if (name === "regency_id") {
        updatedForm.district_id = undefined;
        const selectedRegency = regencies.find((r) => r.id === Number(value));
        console.log("Selected regency:", selectedRegency?.id);
        // console.log("districts:", selectedRegency?.id.);
        console.log(regencies);
        setDistricts(regencies.find((r) => r.id === Number(value))?.districts || []);
        console.log("Updated districts:", districts);
      }

      return updatedForm;
    });
  };

  /** Simpan data */
  const handleSubmit = () => {
    if (!formData.regency_id || !formData.district_id || !formData.street) {
      setError("Please fill in all required fields");
      return;
    }

    const addressData: Address = {
      id: formData.id,
      regency_id: formData.regency_id,
      district_id: formData.district_id,
      street: formData.street,
      regency: regencies.find((r) => r.id === formData.regency_id),
      district: districts.find((d) => d.id === formData.district_id),
    };

    onSave(addressData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[650px] shadow-lg">
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
