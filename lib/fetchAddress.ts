import { Address } from "../components/modals/AddressModal";

interface ApiResponse {
  data: Address[];
  message?: string;
}

export async function fetchAddresses(token: string): Promise<Address[]> {
  try {
    const res = await fetch("https://angkutin.vercel.app/v1/address", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Failed to fetch addresses: ${errorData}`);
    }

    const result: ApiResponse = await res.json();

    if (Array.isArray(result.data)) {
      // Remove duplicates by using a Map to ensure unique addresses by ID
      const uniqueAddresses = result.data
        .filter((addr) => addr.id && typeof addr.id === "number") // Ensure only addresses with valid numeric id
        .reduce((acc, addr) => {
          if (!acc.has(addr.id!)) {
            acc.set(addr.id!, addr);
          }
          return acc;
        }, new Map<number, Address>());

      return Array.from(uniqueAddresses.values());
    } else {
      throw new Error("Invalid data format received from server");
    }
  } catch (error) {
    throw error;
  }
}

export async function createAddress(
  token: string,
  address: {
    street: string;
    regency_id: number;
    district_id: number;
  }
): Promise<Address> {
  const res = await fetch("https://angkutin.vercel.app/v1/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(address),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Failed to create address: ${JSON.stringify(errorData)}`);
  }

  const result = await res.json();
  return result.data;
}

export async function updateAddress(
  token: string,
  addressId: number,
  address: {
    street: string;
    regency_id: number;
    district_id: number;
  }
): Promise<Address> {
  const res = await fetch(
    `https://angkutin.vercel.app/v1/address/${addressId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Failed to update address: ${JSON.stringify(errorData)}`);
  }

  const result = await res.json();
  return result.data;
}

export async function deleteAddress(
  token: string,
  addressId: number
): Promise<void> {
  const res = await fetch(
    `https://angkutin.vercel.app/v1/address/${addressId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Failed to delete address: ${errorData}`);
  }
}
