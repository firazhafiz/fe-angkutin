"use client";

import { useState, useEffect } from "react";

export interface Address {
  id?: number;
  user_id?: number;
  regency_id?: number;
  district_id?: number;
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

interface Regency {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  regency_id: number;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Address) => void;
  initialData?: Address;
}

export default function AddressModal({ isOpen, onClose, onSave, initialData }: AddressModalProps) {
  const [formData, setFormData] = useState<Address>({
    street: "",
    regency_id: undefined,
    district_id: undefined,
  });
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cache key and expiration (24 hours)
  const CACHE_KEY_REGENCIES = "regencies_cache";
  const CACHE_KEY_DISTRICTS = "districts_cache";
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Helper to check cache validity
  const isCacheValid = (cache: string | null) => {
    if (!cache) return false;
    const parsed = JSON.parse(cache);
    return parsed.timestamp && Date.now() - parsed.timestamp < CACHE_DURATION;
  };

  // Fetch regencies with caching
  useEffect(() => {
    if (isOpen) {
      const fetchRegencies = async () => {
        // Check localStorage first
        const cachedRegencies = localStorage.getItem(CACHE_KEY_REGENCIES);
        if (cachedRegencies && isCacheValid(cachedRegencies)) {
          setRegencies(JSON.parse(cachedRegencies).data);
          return;
        }

        setLoadingRegencies(true);
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

          const res = await fetch("https://angkutin.vercel.app/v1/regency", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error("Failed to fetch regencies");
          const result = await res.json();
          if (Array.isArray(result.data)) {
            setRegencies(result.data);
            localStorage.setItem(CACHE_KEY_REGENCIES, JSON.stringify({ data: result.data, timestamp: Date.now() }));
          } else {
            throw new Error("Invalid regency data format");
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load regencies");
        } finally {
          setLoadingRegencies(false);
        }
      };
      fetchRegencies();
    }
  }, [isOpen]);

  // Fetch districts with caching
  useEffect(() => {
    if (formData.regency_id) {
      const fetchDistricts = async () => {
        // Check localStorage for cached districts
        const cachedDistricts = localStorage.getItem(CACHE_KEY_DISTRICTS);
        if (cachedDistricts && isCacheValid(cachedDistricts)) {
          const allDistricts: District[] = JSON.parse(cachedDistricts).data;
          setDistricts(allDistricts.filter((d) => d.regency_id === formData.regency_id));
          return;
        }

        setLoadingDistricts(true);
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

          const res = await fetch("https://angkutin.vercel.app/v1/district", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error("Failed to fetch districts");
          const result = await res.json();
          if (Array.isArray(result.data)) {
            const filteredDistricts = result.data.filter((d: District) => d.regency_id === formData.regency_id);
            setDistricts(filteredDistricts);
            localStorage.setItem(CACHE_KEY_DISTRICTS, JSON.stringify({ data: result.data, timestamp: Date.now() }));
          } else {
            throw new Error("Invalid district data format");
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load districts");
        } finally {
          setLoadingDistricts(false);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      setFormData((prev) => ({ ...prev, district_id: undefined }));
    }
  }, [formData.regency_id]);

  // Initialize form data
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        street: initialData.street || "",
        regency_id: initialData.regency_id || undefined,
        district_id: initialData.district_id || undefined,
      });
    } else {
      setFormData({
        street: "",
        regency_id: undefined,
        district_id: undefined,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "regency_id" || name === "district_id" ? (value ? Number(value) : undefined) : value,
      ...(name === "regency_id" && { district_id: undefined }), // Reset district_id when regency changes
    }));
  };

  const handleSubmit = () => {
    if (!formData.regency_id || !formData.district_id || !formData.street) {
      setError("Please fill in all required fields");
      return;
    }
    onSave({
      ...formData,
      regency: regencies.find((r) => r.id === formData.regency_id),
      district: districts.find((d) => d.id === formData.district_id),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[650px] shadow-lg">
        <h2 className="text-lg font-semibold text-[#016A70] mb-4">{initialData ? "Edit Address" : "Add Address"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-3">
          <select name="regency_id" value={formData.regency_id || ""} onChange={handleChange} className="w-full border p-2 rounded-lg text-slate-500 mt-2" disabled={loadingRegencies}>
            <option value="">Select City</option>
            {regencies.map((regency) => (
              <option key={regency.id} value={regency.id}>
                {regency.name}
              </option>
            ))}
          </select>
          <select name="district_id" value={formData.district_id || ""} onChange={handleChange} className="w-full border p-2 rounded-lg text-slate-500 mt-2" disabled={loadingDistricts || !formData.regency_id}>
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
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
