"use client";

import { memo, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import AddressModal, { Address } from "../modals/AddressModal";
import { useAddressManager } from "../../lib/addressHooks";
import { invalidateAddressCache } from "../../lib/addressData";

interface AddressManagerProps {
  initialAddresses?: Address[];
  initialError?: string | null;
}

// Memoized address card component for better performance
const AddressCard = memo(
  ({
    address,
    index,
    onEdit,
    onDelete,
  }: {
    address: Address;
    index: number;
    onEdit: (index: number) => void;
    onDelete: (id: number) => void;
  }) => (
    <div
      key={address.id || index}
      className="border rounded-2xl p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="mb-3">
            <p className="text-slate-500 text-sm font-medium">City</p>
            <h3 className="text-[#016A70] font-semibold">
              {address.regency?.name || "N/A"}
            </h3>
          </div>
          <div className="mb-3">
            <p className="text-slate-500 text-sm font-medium">District</p>
            <h3 className="text-[#016A70] font-semibold">
              {address.district?.name || "N/A"}
            </h3>
          </div>
          <div className="mb-3">
            <p className="text-slate-500 text-sm font-medium">Street</p>
            <h3 className="text-[#016A70] font-semibold">
              {address.street || "N/A"}
            </h3>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(index)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit address"
          >
            <FiEdit className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={() => address.id && onDelete(address.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete address"
          >
            <svg
              className="h-4 w-4 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
);

AddressCard.displayName = "AddressCard";

const AddressManager = memo(function AddressManager({
  initialAddresses = [],
  initialError = null,
}: AddressManagerProps) {
  const {
    addresses,
    modalOpen,
    editingIndex,
    error,
    isSubmitting,
    loading,
    handleSave,
    handleDelete,
    openModal,
    closeModal,
    setError,
  } = useAddressManager(initialAddresses, initialError);

  // Trigger events when addresses change
  useEffect(() => {
    if (addresses.length > 0) {
      // Invalidate cache
      invalidateAddressCache();

      // Dispatch custom event
      window.dispatchEvent(new CustomEvent("addressChanged"));

      // Update localStorage flag
      localStorage.setItem("addresses_updated", Date.now().toString());

      // Trigger storage event for other tabs
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "addresses_updated",
          newValue: Date.now().toString(),
          oldValue: null,
          storageArea: localStorage,
        })
      );
    }
  }, [addresses]);

  // Trigger specific event when addresses are deleted
  useEffect(() => {
    // Dispatch address deleted event when addresses array changes
    // This will be caught by OrderAddressClient and AddressList
    window.dispatchEvent(new CustomEvent("addressDeleted"));
  }, [addresses.length]);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#016A70]"></div>
        <span className="ml-2 text-gray-500">Loading addresses...</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#016A70]">Address</h2>
        <button
          className="bg-[#016A70] px-4 py-2 rounded-lg text-white hover:bg-[#015a5f] transition-colors"
          onClick={() => openModal()}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Add Address"}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-red-500 text-xs mt-1 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="mt-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">📍</div>
          <p className="text-gray-500 text-lg">No addresses found</p>
          <p className="text-gray-400 text-sm mt-2">
            Add your first address to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {addresses.map((address, index) => (
            <AddressCard
              key={address.id || index}
              address={address}
              index={index}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Address Modal */}
      <AddressModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        initialData={
          editingIndex !== null ? addresses[editingIndex] : undefined
        }
      />
    </>
  );
});

export default AddressManager;
