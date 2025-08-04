"use client";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import editIcon from "../../../../../public/icons/edit.png";
import SidebarLayout from "../../../../../components/layouts/SidebarLayout";
import AddressModal, { Address } from "../../../../../components/modals/AddressModal";

interface ApiResponse {
  data: Address[];
  message?: string;
}

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized fetch function untuk menghindari re-creation
  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const res = await fetch("https://angkutin.vercel.app/v1/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to fetch addresses: ${errorData}`);
      }

      const result: ApiResponse = await res.json();

      if (Array.isArray(result.data)) {
        setAddresses(result.data);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load address data";
      setError(errorMessage);
      console.error("Error fetching addresses:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // Handle save address with API integration
  const handleSave = async (address: Address) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const isEditing = editingIndex !== null;
      const url = isEditing ? `https://angkutin.vercel.app/v1/address/${addresses[editingIndex!].id}` : "https://angkutin.vercel.app/v1/address";

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to ${isEditing ? "update" : "create"} address: ${errorData}`);
      }

      const result = await res.json();

      // Update local state
      if (isEditing) {
        setAddresses((prev) => prev.map((addr, index) => (index === editingIndex ? result.data : addr)));
      } else {
        setAddresses((prev) => [...prev, result.data]);
      }

      // Reset form state
      setEditingIndex(null);
      setModalOpen(false);

      // Show success message (you can add a toast notification here)
      console.log(`Address ${isEditing ? "updated" : "created"} successfully`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to ${editingIndex !== null ? "update" : "create"} address`;
      setError(errorMessage);
      console.error("Error saving address:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete address
  const handleDelete = async (addressId: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`https://angkutin.vercel.app/v1/address/${addressId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to delete address: ${errorData}`);
      }

      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
      console.log("Address deleted successfully");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete address";
      setError(errorMessage);
      console.error("Error deleting address:", err);
    }
  };

  // Handle modal open/close
  const openModal = (index?: number) => {
    setEditingIndex(index ?? null);
    setModalOpen(true);
    setError(null); // Clear any previous errors
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingIndex(null);
    setError(null);
  };

  // Render loading state
  if (loading) {
    return (
      <SidebarLayout>
        <h2 className="text-xl font-semibold text-[#016A70]">Address</h2>
        <div className="mt-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#016A70]"></div>
          <span className="ml-2 text-gray-500">Loading addresses...</span>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#016A70]">Address</h2>
        <button className="bg-[#016A70] px-4 py-2 rounded-lg text-white hover:bg-[#015a5f] transition-colors" onClick={() => openModal()} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Add Address"}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={() => setError(null)} className="text-red-500 text-xs mt-1 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="mt-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">📍</div>
          <p className="text-gray-500 text-lg">No addresses found</p>
          <p className="text-gray-400 text-sm mt-2">Add your first address to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {addresses.map((address, index) => (
            <div key={address.id || index} className="border rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="mb-3">
                    <p className="text-slate-500 text-sm font-medium">City</p>
                    <h3 className="text-[#016A70] font-semibold">{address.regency?.name || "N/A"}</h3>
                  </div>
                  <div className="mb-3">
                    <p className="text-slate-500 text-sm font-medium">District</p>
                    <h3 className="text-[#016A70] font-semibold">{address.district?.name || "N/A"}</h3>
                  </div>
                  <div className="mb-3">
                    <p className="text-slate-500 text-sm font-medium">Street</p>
                    <h3 className="text-[#016A70] font-semibold">{address.street || "N/A"}</h3>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal(index)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit address">
                    <Image src={editIcon} alt="Edit" className="h-4 w-4" />
                  </button>
                  <button onClick={() => address.id && handleDelete(address.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete address">
                    <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Address Modal */}
      <AddressModal isOpen={modalOpen} onClose={closeModal} onSave={handleSave} initialData={editingIndex !== null ? addresses[editingIndex] : undefined} />
    </SidebarLayout>
  );
}
