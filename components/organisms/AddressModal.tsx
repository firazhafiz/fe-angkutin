"use client";

import { useState, useEffect } from "react";
import AddressList from "../moleculs/AddressList";
import NewAddress from "../moleculs/NewAddress";
import EditAddress from "../moleculs/EditAddress";
import { User, AddressData, Address } from "../../types/user";

interface FormData {
  name: string;
  phone: string;
  provinsi: string;
  city: string;
  streetAddress: string;
  detailLainnya: string;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (address: AddressData) => void;
  user?: User | null; // Data user untuk alamat dinamis
  initialAddress?: AddressData; // Pastikan initialAddress ada di sini
}

export default function AddressModal({
  isOpen,
  onClose,
  onEdit,
  user,
  initialAddress,
}: AddressModalProps) {
  const [currentModal, setCurrentModal] = useState<
    "address-list" | "new-address" | "edit-address"
  >("address-list");
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null
  );

  // Inisialisasi selectedAddress dari initialAddress jika ada
  useEffect(() => {
    if (initialAddress && !selectedAddress) {
      setSelectedAddress(initialAddress);
    }
  }, [initialAddress, selectedAddress]);

  const handleAddNewAddress = () => {
    setCurrentModal("new-address");
  };

  const handleEditAddress = (address: AddressData) => {
    setSelectedAddress(address);
    setCurrentModal("edit-address");
  };

  const handleNewAddressConfirm = (addressData: FormData) => {
    const newAddress: AddressData = {
      name: addressData.name,
      phone: addressData.phone,
      address: `${addressData.streetAddress}, ${addressData.city}, ${addressData.provinsi}, ${addressData.detailLainnya}`,
    };
    console.log("New address data:", newAddress);
    setCurrentModal("address-list");
    onEdit(newAddress);
  };

  const handleEditAddressConfirm = (addressData: FormData) => {
    const updatedAddress: AddressData = {
      name: addressData.name,
      phone: addressData.phone,
      address: `${addressData.streetAddress}, ${addressData.city}, ${addressData.provinsi}, ${addressData.detailLainnya}`,
    };
    console.log("Edit address data:", updatedAddress);
    setCurrentModal("address-list");
    onEdit(updatedAddress);
  };

  const handleBackToAddressList = () => {
    setCurrentModal("address-list");
  };

  const handleCloseModal = () => {
    setCurrentModal("address-list");
    onClose();
  };

  const handleConfirm = () => {
    if (selectedAddress) {
      onEdit(selectedAddress);
    }
    onClose();
  };

  if (!isOpen) return null;

  if (currentModal === "new-address") {
    return (
      <NewAddress
        isOpen={true}
        onClose={handleBackToAddressList}
        onConfirm={handleNewAddressConfirm}
        user={user}
      />
    );
  }

  if (currentModal === "edit-address") {
    return (
      <EditAddress
        isOpen={true}
        onClose={handleBackToAddressList}
        onConfirm={handleEditAddressConfirm}
        addressData={selectedAddress!}
        user={user}
      />
    );
  }

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
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col mx-4">
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">My Address</h2>
        </div>
        <div className="flex-1 overflow-y-auto min-h-0">
          <AddressList
            onEdit={handleEditAddress}
            addresses={user?.addresses || []}
          />
        </div>
        <div className="p-6 border-t border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-center">
            <button
              onClick={handleAddNewAddress}
              className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm"
            >
              Add new address
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-[#FF5656] text-white rounded-md hover:bg-red-400 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="py-2 px-4 bg-tosca text-white rounded-md hover:bg-tosca/90 transition-colors text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
