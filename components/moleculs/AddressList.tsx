"use client";

import { useEffect } from "react";
import { useAddressData, useSelectedAddress } from "../../lib/addressData";
import Address from "../atoms/Address";
import { User } from "../../types/user";
import { Address as AddressType } from "../modals/AddressModal";

interface AddressData {
  name: string;
  phone: string;
  address: string;
}

interface AddressListProps {
  onEdit: (address: AddressData) => void;
  user?: User | null;
}

export default function AddressList({ onEdit, user }: AddressListProps) {
  const { addresses, loading, error, fetchAddressData } = useAddressData();
  const {
    selectedAddress,
    updateSelectedAddress,
    clearSelectedAddress,
    ensureSelectedAddress,
  } = useSelectedAddress();

  // Trigger fetch on mount only once
  useEffect(() => {
    fetchAddressData();
  }, [fetchAddressData]);

  // Ensure we always have a selected address when addresses change
  useEffect(() => {
    ensureSelectedAddress(addresses);
  }, [addresses, ensureSelectedAddress]);

  // Listen for address deletion events
  useEffect(() => {
    const handleAddressDeleted = () => {
      // Force refresh address data and update selection
      fetchAddressData(true);

      // After data refresh, ensure we have a valid selection
      setTimeout(() => {
        ensureSelectedAddress(addresses);
      }, 100);
    };

    window.addEventListener("addressDeleted", handleAddressDeleted);

    return () => {
      window.removeEventListener("addressDeleted", handleAddressDeleted);
    };
  }, [
    selectedAddress,
    addresses,
    fetchAddressData,
    clearSelectedAddress,
    updateSelectedAddress,
    ensureSelectedAddress,
  ]);

  const handleSelect = (index: number, address: AddressType) => {
    updateSelectedAddress(address);
  };

  const handleEdit = (address: AddressData) => {
    onEdit(address);
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">Error: {error}</div>;
  }

  if (addresses.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No addresses available. Please add an address first.
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {addresses.map((address, index) => {
        const addressText = [
          address.street,
          address.district?.name,
          address.regency?.name,
        ]
          .filter(Boolean)
          .join(", ");

        const addressData: AddressData = {
          name: user?.name || "User",
          phone: user?.phone || "No phone",
          address: addressText,
        };

        const isSelected = selectedAddress?.id === address.id;

        return (
          <Address
            key={address.id || index}
            address={addressData}
            isSelected={isSelected}
            onSelect={() => handleSelect(index, address)}
            onEdit={() => handleEdit(addressData)}
          />
        );
      })}
    </div>
  );
}
