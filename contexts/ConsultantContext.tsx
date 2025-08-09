"use client";
import { useAuth } from "@/app/context/AuthContext";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ConsultantCategory {
  id: number;
  name: string;
  thumbnail?: string;
  consultantCount?: number;
}

export interface Consultant {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  specialization?: string;
  rating?: number;
  experience?: number;
  description?: string;
  categoryId?: number;
  category?: ConsultantCategory;
}

export interface Consultation {
  id: number;
  user_id: number;
  consultantId: number;
  status: "pending" | "accepted" | "rejected" | "completed";
  created_at: string;
  user?: Consultant;
  consultan?: Consultant;
}

interface ConsultantContextType {
  selectedCategoryIndex: number;
  setSelectedCategoryIndex: (index: number) => void;
  handleSelectCategory: (index: number) => Promise<void>;
  categories: ConsultantCategory[];
  consultants: Consultant[];
  loading: boolean;
  error: string | null;
  fetchConsultantsByCategory: (categoryId: number) => Promise<void>;
  createConsultation: (consultantId: number) => Promise<Consultation | null>;
}

const ConsultantContext = createContext<ConsultantContextType | undefined>(undefined);

interface ConsultantProviderProps {
  children: ReactNode;
}

// ... (other imports remain the same)
export function ConsultantProvider({ children }: ConsultantProviderProps) {
  const { token } = useAuth();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [categories, setCategories] = useState<ConsultantCategory[]>([]);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchedCategoryId, setLastFetchedCategoryId] = useState<number | null>(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const headers: HeadersInit = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch("https://angkutin.vercel.app/v1/consultant/categories", {
        headers,
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to fetch categories: ${errorData}`);
      }

      const result = await res.json();

      if (Array.isArray(result.data)) {
        setCategories(result.data);

        // Fetch consultants for the first category
        if (result.data.length > 0) {
          await fetchConsultantsByCategory(result.data[0].id);
        }
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load categories";
      setError(errorMessage);
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConsultantsByCategory = async (categoryId: number) => {
    // Skip fetching if the same category is selected
    if (categoryId === lastFetchedCategoryId) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const headers: HeadersInit = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(`https://angkutin.vercel.app/v1/consultant/category/${categoryId}`, {
        headers,
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to fetch consultants: ${errorData}`);
      }

      const result = await res.json();

      if (Array.isArray(result.data.users)) {
        setConsultants(result.data.users);
        setLastFetchedCategoryId(categoryId); // Update last fetched category
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load consultants";
      setError(errorMessage);
      console.error("Error fetching consultants:", err);
    } finally {
      setLoading(false);
    }
  };

  const createConsultation = async (consultantId: number): Promise<Consultation | null> => {
    try {
      if (!token) {
        throw new Error("No authentication token found");
      }

      const res = await fetch("https://angkutin.vercel.app/v1/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          consultantId: consultantId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to create consultation: ${errorData}`);
      }

      const result = await res.json();
      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create consultation";
      setError(errorMessage);
      console.error("Error creating consultation:", err);
      return null;
    }
  };

  const handleSelectCategory = async (index: number) => {
    setSelectedCategoryIndex(index);
    const selected = categories[index];
    if (selected) {
      await fetchConsultantsByCategory(selected.id);
    }
  };

  return (
    <ConsultantContext.Provider
      value={{
        selectedCategoryIndex,
        setSelectedCategoryIndex,
        handleSelectCategory,
        categories,
        consultants,
        loading,
        error,
        fetchConsultantsByCategory,
        createConsultation,
      }}>
      {children}
    </ConsultantContext.Provider>
  );
}

export function useConsultant() {
  const context = useContext(ConsultantContext);
  if (context === undefined) {
    throw new Error("useConsultant must be used within a ConsultantProvider");
  }
  return context;
}
