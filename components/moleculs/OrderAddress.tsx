"use client";

import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { pickupAddressData } from "../../data/pickupAddress";
import AddressModal from "../organisms/AddressModal";

interface AddressData {
  name: string;
  phone: string;
  address: string;
}

export default function OrderAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressData>(
    pickupAddressData[0]
  );

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddressEdit = (address: AddressData) => {
    setSelectedAddress(address);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <MdLocationOn className="text-tosca text-xl" />
          <h2 className="text-xl font-bold text-tosca">Pickup Address</h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column - Name and Phone */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">
              {selectedAddress.name}
            </h3>
            <p className="text-gray-600 text-sm">({selectedAddress.phone})</p>
            <button
              onClick={handleEditClick}
              className="bg-tosca text-white px-4 py-2 rounded-md text-sm hover:bg-tosca/90 transition-colors"
            >
              Edit
            </button>
          </div>

          {/* Right Column - Address */}
          <div className="md:col-span-1">
            <p className="text-gray-600 text-sm leading-relaxed">
              {selectedAddress.address}
            </p>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onEdit={handleAddressEdit}
      />
    </>
  );
}
