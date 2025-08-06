"use client";

import React, { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import AddressModal from "../organisms/AddressModal";
import { useSelectedAddress, useAddressData } from "../../lib/addressData";
import { User } from "../../types/user";
import type { AddressData } from "../../types/user";

export default function OrderAddressClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Force refresh key
  const {
    selectedAddressText,
    refreshSelectedAddress,
    clearSelectedAddress,
    selectedAddress,
    updateSelectedAddress,
    ensureSelectedAddress,
  } = useSelectedAddress();
  const { addresses, fetchAddressData } = useAddressData();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as User;
        setUserData(parsed);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Ensure we always have a selected address when addresses change
  useEffect(() => {
    ensureSelectedAddress(addresses);
  }, [addresses, ensureSelectedAddress]);

  // Fetch address data on mount to validate selected address
  useEffect(() => {
    fetchAddressData();
  }, [fetchAddressData]);

  // Listen for address changes and deletions
  useEffect(() => {
    const handleAddressChange = () => {
      // Force refresh when addresses change
      setRefreshKey((prev) => prev + 1);
      setTimeout(() => {
        refreshSelectedAddress();
      }, 100);
    };

    const handleAddressDeleted = () => {
      // Clear selected address and force refresh when address is deleted
      clearSelectedAddress();
      setRefreshKey((prev) => prev + 1);
    };

    // Listen for custom events
    window.addEventListener("addressChanged", handleAddressChange);
    window.addEventListener("addressDeleted", handleAddressDeleted);

    // Also listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "addresses_updated") {
        handleAddressChange();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("addressChanged", handleAddressChange);
      window.removeEventListener("addressDeleted", handleAddressDeleted);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refreshSelectedAddress, clearSelectedAddress]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddressEdit = (address: AddressData) => {
    setIsModalOpen(false);
    // Force refresh after address edit
    setRefreshKey((prev) => prev + 1);
    // Also refresh the selected address
    setTimeout(() => {
      refreshSelectedAddress();
    }, 100);
  };

  if (!userData) {
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
            <h3 className="font-semibold text-gray-800">
              {userData.name || ""}
            </h3>
            <p className="text-gray-600 text-sm">({userData.phone || ""})</p>
            <button
              onClick={handleEditClick}
              className="bg-tosca text-white px-4 py-2 rounded-md text-sm hover:bg-tosca/90 transition-colors"
            >
              Edit
            </button>
          </div>

          <div className="md:col-span-1">
            {addresses.length === 0 ? (
              <div className="w-full h-16 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedAddressText || "Loading address..."}
              </p>
            )}
          </div>
        </div>
      </div>

      <AddressModal
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
      />
    </>
  );
}
