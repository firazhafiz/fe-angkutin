"use client";

// components/moleculs/OrderAddress.tsx
import { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import AddressModal from "../organisms/AddressModal";
import { User, AddressData, Address } from "../../types/user";

export default function OrderAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressData>({
    name: "",
    phone: "",
    address: "",
  });
  const [userData, setUserData] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state loading

  // Ambil data dari localStorage saat komponen dimuat
  useEffect(() => {
    setIsLoading(true); // Mulai loading
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    console.log("Stored User from localStorage:", storedUser); // Debugging

    if (storedToken) setToken(storedToken);
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as User;
        setUserData(parsed);

        // Inisialisasi selectedAddress dari data user
        const firstAddress = parsed.addresses?.[0];
        setSelectedAddress({
          name: parsed.name || "",
          phone: parsed.phone || "",
          address: firstAddress?.address || "",
        });
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.warn("No user data found in localStorage");
    }
    setIsLoading(false); // Selesai loading
  }, []);

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

  // Tampilkan skeleton atau pesan error jika loading atau data tidak ada
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            <div className="w-20 h-8 bg-gray-300 rounded"></div>
          </div>
          <div className="md:col-span-1">
            <div className="w-full h-16 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-red-600">
        No user data available. Please log in.
      </div>
    );
  }

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
        initialAddress={selectedAddress}
        user={userData}
      />
    </>
  );
}
