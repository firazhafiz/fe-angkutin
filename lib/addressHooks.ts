import { useState, useEffect, useCallback } from "react";
import { Address } from "../components/modals/AddressModal";
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "./fetchAddress";

export function useAddressManager(
  initialAddresses: Address[] = [],
  initialError: string | null = null
) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(initialError);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(initialAddresses.length === 0);

  // Optimized fetch function
  const loadAddresses = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const fetchedAddresses = await fetchAddresses(token);
      setAddresses(fetchedAddresses);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load address data";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Optimized useEffect - only run once on mount if no initial data
  useEffect(() => {
    if (initialAddresses.length === 0) {
      loadAddresses();
    }
  }, []); // Remove dependencies to prevent re-runs

  // Optimized save handler
  const handleSave = useCallback(
    async (address: Address) => {
      try {
        setIsSubmitting(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const isEditing = editingIndex !== null;
        let savedAddress: Address;

        if (isEditing && editingIndex !== null) {
          const addressToUpdate = addresses[editingIndex];
          savedAddress = await updateAddress(token, addressToUpdate.id!, {
            street: address.street,
            regency_id: address.regency_id!,
            district_id: address.district_id!,
          });
        } else {
          savedAddress = await createAddress(token, {
            street: address.street,
            regency_id: address.regency_id!,
            district_id: address.district_id!,
          });
        }

        // Use regency and district from AddressModal to avoid extra API calls
        const completeAddress: Address = {
          ...savedAddress,
          regency: address.regency,
          district: address.district,
        };

        // Update local state with complete address
        if (isEditing) {
          setAddresses((prev) =>
            prev.map((addr, index) =>
              index === editingIndex ? completeAddress : addr
            )
          );
        } else {
          setAddresses((prev) => {
            // Prevent duplicates by checking if address already exists by ID
            const existingAddress = prev.find(
              (addr) => addr.id === completeAddress.id
            );
            if (existingAddress) {
              return prev;
            }
            return [...prev, completeAddress];
          });
        }

        setEditingIndex(null);
        setModalOpen(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : `Failed to ${
                editingIndex !== null ? "update" : "create"
              } address`;
        setError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [addresses, editingIndex]
  );

  // Optimized delete handler
  const handleDelete = useCallback(async (addressId: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      await deleteAddress(token, addressId);
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete address";
      setError(errorMessage);
    }
  }, []);

  // Optimized modal handlers
  const openModal = useCallback((index?: number) => {
    setEditingIndex(index ?? null);
    setModalOpen(true);
    setError(null);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingIndex(null);
    setError(null);
  }, []);

  return {
    addresses,
    modalOpen,
    editingIndex,
    error,
    isSubmitting,
    loading,
    handleSave,
    handleDelete,
    openModal,
    closeModal,
    setError,
  };
}
