"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";

interface AddressData {
  name: string;
  phone: string;
  address: string;
}

interface FormData {
  name: string;
  phone: string;
  regency_id: number | undefined;
  district_id: number | undefined;
  street: string;
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

interface EditAddressProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (addressData: FormData) => void;
  addressData: AddressData;
}

export default function EditAddress({ isOpen, onClose, onConfirm, addressData }: EditAddressProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    regency_id: undefined,
    district_id: undefined,
    street: "",
  });
  const { token } = useAuth();

  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const CACHE_KEY_REGENCIES = "regencies_cache";
  const CACHE_KEY_DISTRICTS = "districts_cache";
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const isCacheValid = (cache: string | null) => {
    if (!cache) return false;
    const parsed = JSON.parse(cache);
    return parsed.timestamp && Date.now() - parsed.timestamp < CACHE_DURATION;
  };

  // Load regencies on mount
  useEffect(() => {
    if (isOpen) {
      const fetchRegencies = async () => {
        const cachedRegencies = localStorage.getItem(CACHE_KEY_REGENCIES);
        if (cachedRegencies && isCacheValid(cachedRegencies)) {
          setRegencies(JSON.parse(cachedRegencies).data);
          return;
        }

        setLoadingRegencies(true);
        try {
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

  // Parse address data and set form data
  useEffect(() => {
    if (addressData && regencies.length > 0) {
      // Parse address string to extract regency, district, and street
      const addressParts = addressData.address.split(", ");

      // Find regency and district from the address parts
      let regencyId: number | undefined;
      let districtId: number | undefined;
      let street = addressData.address;

      // Try to find regency by name in address parts
      const regency = regencies.find((r) => addressParts.some((part) => part.trim().includes(r.name)));

      if (regency) {
        regencyId = regency.id;

        // Remove regency from address parts to get remaining parts
        const remainingParts = addressParts.filter((part) => !part.trim().includes(regency.name));

        // Try to find district in remaining parts
        if (districts.length > 0) {
          const district = districts.find((d) => remainingParts.some((part) => part.trim().includes(d.name)));

          if (district) {
            districtId = district.id;
            // Remove district from remaining parts to get street
            street = remainingParts.filter((part) => !part.trim().includes(district.name)).join(", ");
          } else {
            // If district not found, use remaining parts as street
            street = remainingParts.join(", ");
          }
        } else {
          // If no districts loaded yet, use remaining parts as street
          street = remainingParts.join(", ");
        }
      }

      setFormData({
        name: addressData.name,
        phone: addressData.phone,
        regency_id: regencyId,
        district_id: districtId,
        street: street,
      });

      // If regency is found, load districts for that regency
      if (regencyId) {
        const fetchDistrictsForRegency = async () => {
          const cachedDistricts = localStorage.getItem(CACHE_KEY_DISTRICTS);
          if (cachedDistricts && isCacheValid(cachedDistricts)) {
            const allDistricts: District[] = JSON.parse(cachedDistricts).data;
            const filteredDistricts = allDistricts.filter((d) => d.regency_id === regencyId);
            setDistricts(filteredDistricts);
            return;
          }

          setLoadingDistricts(true);
          try {
            if (!token) throw new Error("No authentication token found");

            const res = await fetch("https://angkutin.vercel.app/v1/district", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch districts");
            const result = await res.json();
            if (Array.isArray(result.data)) {
              const filteredDistricts = result.data.filter((d: District) => d.regency_id === regencyId);
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
        fetchDistrictsForRegency();
      }
    }
  }, [addressData, regencies]);

  // Re-parse address data after districts are loaded
  useEffect(() => {
    if (addressData && regencies.length > 0 && districts.length > 0 && formData.regency_id) {
      // Parse address string to extract regency, district, and street
      const addressParts = addressData.address.split(", ");

      // Find regency and district from the address parts
      let regencyId: number | undefined;
      let districtId: number | undefined;
      let street = addressData.address;

      // Try to find regency by name in address parts
      const regency = regencies.find((r) => addressParts.some((part) => part.trim().includes(r.name)));

      if (regency) {
        regencyId = regency.id;

        // Remove regency from address parts to get remaining parts
        const remainingParts = addressParts.filter((part) => !part.trim().includes(regency.name));

        // Try to find district in remaining parts
        const district = districts.find((d) => remainingParts.some((part) => part.trim().includes(d.name)));

        if (district) {
          districtId = district.id;
          // Remove district from remaining parts to get street
          street = remainingParts.filter((part) => !part.trim().includes(district.name)).join(", ");
        } else {
          // If district not found, use remaining parts as street
          street = remainingParts.join(", ");
        }
      }

      setFormData((prev) => ({
        ...prev,
        regency_id: regencyId,
        district_id: districtId,
        street: street,
      }));
    }
  }, [addressData, regencies, districts]);

  // Load districts when regency changes and address data is available
  useEffect(() => {
    if (formData.regency_id) {
      const fetchDistricts = async () => {
        const cachedDistricts = localStorage.getItem(CACHE_KEY_DISTRICTS);
        if (cachedDistricts && isCacheValid(cachedDistricts)) {
          const allDistricts: District[] = JSON.parse(cachedDistricts).data;
          const filteredDistricts = allDistricts.filter((d) => d.regency_id === formData.regency_id);
          setDistricts(filteredDistricts);
          return;
        }

        setLoadingDistricts(true);
        try {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "regency_id" || name === "district_id" ? (value ? Number(value) : undefined) : value,
      ...(name === "regency_id" && { district_id: undefined }), // Reset district_id when regency changes
    }));
  };

  const handleConfirm = () => {
    if (!formData.regency_id || !formData.district_id || !formData.street) {
      setError("Please fill in all required fields");
      return;
    }

    // Prepare the address data
    const selectedRegency = regencies.find((r) => r.id === formData.regency_id);
    const selectedDistrict = districts.find((d) => d.id === formData.district_id);

    const addressData: FormData = {
      name: formData.name,
      phone: formData.phone,
      regency_id: formData.regency_id,
      district_id: formData.district_id,
      street: formData.street,
    };

    // Trigger global state update
    window.dispatchEvent(new CustomEvent("addressChanged"));
    localStorage.setItem("addresses_updated", Date.now().toString());
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "addresses_updated",
        newValue: Date.now().toString(),
        oldValue: null,
        storageArea: localStorage,
      })
    );

    onConfirm(addressData);
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
      }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-black-100">Edit Address</h2>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* First Row - Name and Phone (Readonly) */}
          <div className="grid grid-cols-2 gap-4">
            <input type="text" value={formData.name} disabled className="w-full px-3 py-3 border text-sm text-gray-500 bg-gray-100 border-gray-300 rounded-md focus:outline-none" placeholder="Firaz Fulvian Hafiz" />
            <input type="text" value={formData.phone} disabled className="w-full px-3 py-3 border text-sm text-gray-500 bg-gray-100 border-gray-300 rounded-md focus:outline-none" placeholder="Phone Number" />
          </div>

          {/* Second Row - Regency and District */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="regency_id"
              value={formData.regency_id || ""}
              onChange={handleChange}
              className="w-full px-3 py-3 border text-sm text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent"
              disabled={loadingRegencies}>
              <option value="">Select Regency</option>
              {regencies.map((regency) => (
                <option key={regency.id} value={regency.id}>
                  {regency.name}
                </option>
              ))}
            </select>
            <select
              name="district_id"
              value={formData.district_id || ""}
              onChange={handleChange}
              className="w-full px-3 py-3 border text-sm text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent"
              disabled={loadingDistricts || !formData.regency_id}>
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Third Row - Street Address */}
          <textarea
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street Address"
            rows={3}
            className="w-full px-3 py-3 border text-sm text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent resize-none"
          />
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 flex-shrink-0">
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="py-2 px-4 bg-[#FF5656] text-white rounded-md hover:bg-red-400 transition-colors text-sm">
              Cancel
            </button>
            <button onClick={handleConfirm} className="py-2 px-4 bg-tosca text-white rounded-md hover:bg-tosca/90 transition-colors text-sm">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
