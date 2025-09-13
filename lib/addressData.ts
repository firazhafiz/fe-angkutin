"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { fetchAddresses } from "./fetchAddress";
import { useAuth } from "@/app/context/AuthContext";
import { Address } from "../../fe-angkutin/types/user";

// Global cache untuk address data (shared across components)
const globalAddressCache = new Map<string, { data: Address[]; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 menit untuk cache yang lebih lama

// Preload addresses when component mounts
let preloadPromise: Promise<Address[]> | null = null;

const preloadAddresses = (token: string): Promise<Address[]> => {
  if (!preloadPromise) {
    preloadPromise = fetchAddresses(token);
  }
  return preloadPromise;
};

// Function to invalidate cache
export const invalidateAddressCache = (token?: string) => {
  if (token) {
    globalAddressCache.delete(`addresses_${token}`);
  } else {
    globalAddressCache.clear();
  }
  // Reset preload promise
  preloadPromise = null;
};

// Custom hook untuk address fetching dengan advanced optimizations
export const useAddressData = () => {
  const { token } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddressData = useCallback(async (forceRefresh = false) => {
    if (!token) {
      setError("No authentication token found");
      return;
    }

    // Check global cache first (unless force refresh)
    const cacheKey = `addresses_${token}`;
    const cached = globalAddressCache.get(cacheKey);

    if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setAddresses(cached.data);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use preloaded data if available
      const data = await preloadAddresses(token);

      // Update global cache
      globalAddressCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      setAddresses(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch addresses";
      setError(errorMessage);
      console.error("Error fetching addresses:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Listen for address changes from AddressManager
  useEffect(() => {
    const handleAddressChange = () => {
      // Force refresh when address changes
      fetchAddressData(true);
    };

    // Listen for custom event
    window.addEventListener("addressChanged", handleAddressChange);

    // Also listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "addresses_updated") {
        fetchAddressData(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Listen for address deletion
    const handleAddressDeleted = () => {
      // Force refresh and clear cache when address is deleted
      invalidateAddressCache();
      fetchAddressData(true);
    };

    window.addEventListener("addressDeleted", handleAddressDeleted);

    return () => {
      window.removeEventListener("addressChanged", handleAddressChange);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("addressDeleted", handleAddressDeleted);
    };
  }, [fetchAddressData]);

  // Memoized formatted address
  const formattedAddress = useMemo(() => {
    if (addresses.length === 0) return "";

    const firstAddress = addresses[0];
    return [firstAddress.street, firstAddress.district?.name, firstAddress.regency?.name].filter(Boolean).join(", ");
  }, [addresses]);

  return { addresses, loading, error, fetchAddressData, formattedAddress };
};

// Hook untuk selected address management dengan localStorage
export const useSelectedAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedAddressText, setSelectedAddressText] = useState<string>("");

  // Load selected address from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("selectedAddress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Address;
        setSelectedAddress(parsed);
        // Update text immediately
        const text = [parsed.street, parsed.district?.name, parsed.regency?.name].filter(Boolean).join(", ");
        setSelectedAddressText(text);
      } catch (error) {
        console.error("Error parsing selected address:", error);
      }
    }
  }, []);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "selectedAddress" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue) as Address;
          setSelectedAddress(parsed);
          const text = [parsed.street, parsed.district?.name, parsed.regency?.name].filter(Boolean).join(", ");
          setSelectedAddressText(text);
        } catch (error) {
          console.error("Error parsing selected address:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save selected address to localStorage
  const updateSelectedAddress = useCallback((address: Address) => {
    setSelectedAddress(address);
    localStorage.setItem("selectedAddress", JSON.stringify(address));

    // Update text immediately
    const text = [address.street, address.district?.name, address.regency?.name].filter(Boolean).join(", ");
    setSelectedAddressText(text);
  }, []);

  // Force refresh function
  const refreshSelectedAddress = useCallback(() => {
    const saved = localStorage.getItem("selectedAddress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Address;
        setSelectedAddress(parsed);
        const text = [parsed.street, parsed.district?.name, parsed.regency?.name].filter(Boolean).join(", ");
        setSelectedAddressText(text);
      } catch (error) {
        console.error("Error parsing selected address:", error);
      }
    }
  }, []);

  // Clear selected address (when it's deleted)
  const clearSelectedAddress = useCallback(() => {
    setSelectedAddress(null);
    setSelectedAddressText("");
    localStorage.removeItem("selectedAddress");
  }, []);

  // Ensure we always have a selected address when addresses are available
  const ensureSelectedAddress = useCallback(
    (availableAddresses: Address[]) => {
      if (availableAddresses.length > 0) {
        if (!selectedAddress) {
          // If no address is selected, select the first one
          updateSelectedAddress(availableAddresses[0]);
        } else {
          // Check if selected address still exists
          const selectedAddressExists = availableAddresses.find((addr) => addr.id === selectedAddress?.id);

          if (!selectedAddressExists) {
            // If selected address no longer exists, select the first one
            clearSelectedAddress();
            updateSelectedAddress(availableAddresses[0]);
          }
        }
      } else if (selectedAddress) {
        // If no addresses available but we have a selected address, clear it
        clearSelectedAddress();
      }
    },
    [selectedAddress, clearSelectedAddress, updateSelectedAddress]
  );

  return {
    selectedAddress,
    updateSelectedAddress,
    selectedAddressText,
    refreshSelectedAddress,
    clearSelectedAddress,
    ensureSelectedAddress,
  };
};

// Memoized skeleton component
export const AddressSkeleton = React.memo(() => {
  return React.createElement("div", {
    className: "h-4 bg-gray-200 rounded animate-pulse",
  });
});

AddressSkeleton.displayName = "AddressSkeleton";

// Memoized address display component
export const AddressDisplay = React.memo(({ address }: { address: string }) => {
  return React.createElement(
    "p",
    {
      className: "text-gray-600 text-sm leading-relaxed",
    },
    address
  );
});

AddressDisplay.displayName = "AddressDisplay";

// Main address data component dengan advanced optimizations
export function AddressData() {
  const { addresses, loading, error, fetchAddressData, formattedAddress } = useAddressData();
  const { selectedAddressText } = useSelectedAddress();

  // Preload data on mount
  useEffect(() => {
    fetchAddressData();
  }, [fetchAddressData]);

  // Show skeleton while loading
  if (loading) {
    return React.createElement(AddressSkeleton);
  }

  // Show error state
  if (error) {
    return React.createElement(
      "div",
      {
        className: "text-red-600 text-sm",
      },
      `Error: ${error}`
    );
  }

  // Show no data state
  if (addresses.length === 0) {
    return React.createElement(
      "div",
      {
        className: "text-gray-600 text-sm",
      },
      "No address available"
    );
  }

  // Show selected address or first address
  const displayText = selectedAddressText || formattedAddress;
  return React.createElement(AddressDisplay, { address: displayText });
}

export default React.memo(AddressData);
