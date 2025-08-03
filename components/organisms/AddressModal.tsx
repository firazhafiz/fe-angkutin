"use client";

import { useState } from "react";
import AddressList from "../moleculs/AddressList";
import NewAddress from "../moleculs/NewAddress";
import EditAddress from "../moleculs/EditAddress";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (address: any) => void;
}

export default function AddressModal({
  isOpen,
  onClose,
  onEdit,
}: AddressModalProps) {
  const [currentModal, setCurrentModal] = useState<
    "address-list" | "new-address" | "edit-address"
  >("address-list");
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [userData] = useState({
    name: "Firaz Fulvian Hafiz",
    phone: "081234567890",
  });

  const handleAddNewAddress = () => {
    setCurrentModal("new-address");
  };

  const handleEditAddress = (address: any) => {
    setSelectedAddress(address);
    setCurrentModal("edit-address");
  };

  const handleNewAddressConfirm = (addressData: any) => {
    // Handle new address confirmation
    console.log("New address data:", addressData);
    setCurrentModal("address-list");
  };

  const handleEditAddressConfirm = (addressData: any) => {
    // Handle edit address confirmation
    console.log("Edit address data:", addressData);
    setCurrentModal("address-list");
  };

  const handleBackToAddressList = () => {
    setCurrentModal("address-list");
  };

  const handleCloseModal = () => {
    setCurrentModal("address-list");
    onClose();
  };

  const handleConfirm = () => {
    // Handle confirm selection
    onClose();
  };

  if (!isOpen) return null;

  // Render New Address Modal
  if (currentModal === "new-address") {
    return (
      <NewAddress
        isOpen={true}
        onClose={handleBackToAddressList}
        onConfirm={handleNewAddressConfirm}
        userData={userData}
      />
    );
  }

  // Render Edit Address Modal
  if (currentModal === "edit-address") {
    return (
      <EditAddress
        isOpen={true}
        onClose={handleBackToAddressList}
        onConfirm={handleEditAddressConfirm}
        addressData={selectedAddress}
      />
    );
  }

  // Render Main Address List Modal
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
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">My Address</h2>
        </div>

        {/* Address List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <AddressList onEdit={handleEditAddress} />
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-center">
            {/* Add New Address Button */}
            <button
              onClick={handleAddNewAddress}
              className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm"
            >
              Add new address
            </button>

            {/* Cancel and Confirm Buttons */}
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
