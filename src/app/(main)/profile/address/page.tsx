"use client";

import Image from "next/image";
import editIcon from "../../../../../public/icons/edit.png";
import SidebarLayout from "../../../../../components/layouts/SidebarLayout";
import AddressModal, { Address } from "../../../../../components/modals/AddressModal";
import { useState } from "react";

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      city: "Surabaya Selatan",
      district: "Jambangan",
      street: "Jl. Jambangan Baru II No. 15",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSave = (address: Address) => {
    if (editingIndex !== null) {
      // Edit
      const updated = [...addresses];
      updated[editingIndex] = address;
      setAddresses(updated);
    } else {
      // Add
      setAddresses([...addresses, address]);
    }
    setEditingIndex(null);
  };

  return (
    <SidebarLayout>
      <h2 className="text-xl font-semibold text-[#016A70]">Address</h2>
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
