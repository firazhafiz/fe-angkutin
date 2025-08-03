"use client";

import { useState } from "react";
import { pickupAddressData } from "../../data/pickupAddress";
import Address from "../atoms/Address";

interface AddressData {
  name: string;
  phone: string;
  address: string;
}

interface AddressListProps {
  onEdit: (address: AddressData) => void;
}

export default function AddressList({ onEdit }: AddressListProps) {
  const [selectedAddress, setSelectedAddress] = useState(0);

  const handleSelect = (index: number) => {
    setSelectedAddress(index);
  };

  const handleEdit = (address: AddressData) => {
    onEdit(address);
  };

  return (
    <div className="space-y-0">
      {pickupAddressData.map((address, index) => (
        <Address
          key={index}
          address={address}
          isSelected={selectedAddress === index}
          onSelect={() => handleSelect(index)}
          onEdit={() => handleEdit(address)}
        />
      ))}
    </div>
  );
}
