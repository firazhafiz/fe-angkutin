"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import editIcon from "../../../../../public/icons/edit.png";
import SidebarLayout from "../../../../../components/layouts/SidebarLayout";
import AddressModal, { Address } from "../../../../../components/modals/AddressModal";

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data address saat component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://angkutin.vercel.app/v1/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          }, // agar cookie (auth) ikut dikirim
        });
        if (!res.ok) throw new Error("Failed to fetch addresses");

        const result = await res.json();
        setAddresses(result.data); // sesuai response dari backend
      } catch (err) {
        setError("Failed to load address data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleSave = (address: Address) => {
    if (editingIndex !== null) {
      const updated = [...addresses];
      updated[editingIndex] = address;
      setAddresses(updated);
    } else {
      setAddresses([...addresses, address]);
    }
    setEditingIndex(null);
  };

  return (
    <SidebarLayout>
      <h2 className="text-xl font-semibold text-[#016A70]">Address</h2>

      {loading ? (
        <p className="mt-4 text-gray-500">Loading...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 h-full gap-4 mt-6">
          {addresses.map((address, index) => (
            <div key={index} className="border rounded-2xl p-5 flex justify-between gap-2">
              <div>
                <p className="text-slate-500 text-sm">City</p>
                <h2 className="text-[#016A70] font-medium">{address.city}</h2>
                <div className="mt-2">
                  <p className="text-slate-500 text-sm">District</p>
                  <h2 className="text-[#016A70] font-medium">{address.district}</h2>
                </div>
                <div className="mt-2">
                  <p className="text-slate-500 text-sm">Street</p>
                  <h2 className="text-[#016A70] font-medium">{address.street}</h2>
                </div>
              </div>
              <div>
                <Image
                  src={editIcon}
                  alt="edit icon"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => {
                    setEditingIndex(index);
                    setModalOpen(true);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <button
          className="bg-[#016A70] px-4 py-2 rounded-lg text-white"
          onClick={() => {
            setEditingIndex(null);
            setModalOpen(true);
          }}>
          Add Address
        </button>
      </div>

      <AddressModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initialData={editingIndex !== null ? addresses[editingIndex] : undefined} />
    </SidebarLayout>
  );
}
