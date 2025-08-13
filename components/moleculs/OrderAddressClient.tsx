"use client";

import React, { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import AddressModal from "../organisms/AddressModal";
import { User } from "../../types/user";
import { useAuth } from "@/app/context/AuthContext";
import { Address } from "../../types/user";

export default function OrderAddressClient() {
  const { user, addresses } = useAuth();
  const [primaryAddress, setPrimaryAddress] = useState<Address | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(addresses);
    setPrimaryAddress(addresses[0] || null);
  }, [user, addresses]);

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <MdLocationOn className="text-tosca text-xl" />
          <h2 className="text-xl font-bold text-tosca">Pickup Address</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="md:col-span-1">
            <div className="w-full h-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <MdLocationOn className="text-tosca text-xl" />
          <h2 className="text-xl font-bold text-tosca">Pickup Address</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">{user.name || ""}</h3>
            <p className="text-gray-600 text-sm">({user.phone || ""})</p>
            <button className="bg-tosca text-white px-4 py-2 rounded-md text-sm hover:bg-tosca/90 transition-colors">Edit</button>
          </div>

          {primaryAddress ? (
            <div className="md:col-span-1">
              <div key={addresses[0].id} className="space-y-2">
                <p>{primaryAddress.id}</p>
                <h3 className="font-semibold text-gray-800">{primaryAddress?.regency?.name}</h3>
                <p className="text-gray-600 font-semibold text-sm">{primaryAddress?.district?.name}</p>
                <p className="text-gray-600 text-sm">{primaryAddress?.street}</p>
              </div>
            </div>
          ) : (
            <div className="md:col-span-1">
              <div className="w-full h-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          )}
        </div>
      </div>

      {/* <AddressModal
        key={refreshKey} // Force re-render when refreshKey changes
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onEdit={handleAddressEdit}
        user={userData}
        initialAddress={{
          name: userData.name || "",
          phone: userData.phone || "",
          address: "Loading...",
        }}
      /> */}
    </>
  );
}
