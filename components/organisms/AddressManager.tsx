"use client";

import { useState, useEffect, memo } from "react";
import { FiEdit } from "react-icons/fi";
import AddressModal from "../modals/AddressModal";
import { useAuth } from "@/app/context/AuthContext";
import { Address } from "../../types/user";

interface AddressCardProps {
  address: Address;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (id: number) => void;
}

const AddressCard = memo(({ address, index, onEdit, onDelete }: AddressCardProps) => (
  <div className="border rounded-2xl p-5 hover:shadow-md transition-shadow">
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
        <button onClick={() => onEdit(index)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit address">
          <FiEdit className="h-4 w-4 text-gray-600" />
        </button>
        <button onClick={() => address.id && onDelete(address.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete address">
          <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
));
AddressCard.displayName = "AddressCard";

const AddressManager = () => {
  const { addresses, setAddresses, token } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For debugging
    // console.log("Addresses updated:", addresses);
  }, [addresses]);

  const openModal = (index?: number) => {
    setEditingIndex(index ?? null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingIndex(null);
  };

  const handleSave = async (address: Address) => {
    setIsSubmitting(true);
    setError(null);
    try {
      let response;
      if (editingIndex !== null && address.id) {
        // Edit address
        response = await fetch(`http://localhost:4000/v1/address/${address.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            regency_id: address.regency_id,
            district_id: address.district_id,
            street: address.street,
          }),
        });
      } else {
        // Add address
        response = await fetch("http://localhost:4000/v1/address", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(address),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save address");
      }

      const data = await response.json();
      console.log("Address saved:", data);
      let updatedAddresses;
      if (editingIndex !== null) {
        updatedAddresses = addresses.map((a, i) => (i === editingIndex ? data.data : a));
      } else {
        updatedAddresses = [...addresses, data.data];
      }
      setAddresses(updatedAddresses);
      closeModal();
    } catch (e) {
      setError("Failed to save address");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`https://angkutin.vercel.app/v1/address/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete address");
      setAddresses(addresses.filter((a) => a.id !== id));
    } catch {
      setError("Failed to delete address");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#016A70]">Address</h2>
        <button className="bg-[#016A70] px-4 py-2 rounded-lg text-white hover:bg-[#015a5f] transition-colors" onClick={() => openModal()} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Add Address"}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={() => setError(null)} className="text-red-500 text-xs mt-1 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {addresses.length === 0 ? (
        <div className="text-center h-full flex flex-col items-center justify-center">
          <div className="text-gray-400 text-6xl mb-4">📍</div>
          <p className="text-gray-500 text-lg">No addresses found</p>
          <p className="text-gray-400 text-sm mt-2">Add your first address to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {addresses.map((address, index) => (
            <AddressCard key={address.id || index} address={address} index={index} onEdit={openModal} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <AddressModal isOpen={modalOpen} onClose={closeModal} onSave={handleSave} initialData={editingIndex !== null ? addresses[editingIndex] : undefined} />
    </>
  );
};

export default AddressManager;
