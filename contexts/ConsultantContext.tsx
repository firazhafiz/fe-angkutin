"use client";
import { useAuth } from "@/app/context/AuthContext";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, ConsultantCategory } from "../types/user";

export interface Consultation {
  id: number;
  user_id: number;
  consultantId: number;
  status: "pending" | "accepted" | "rejected" | "completed";
  created_at: string;
  user?: User;
  consultan?: User;
}

interface ConsultantContextType {
  selectedCategoryIndex: number;
  handleSelectCategory: (index: number) => Promise<void>;
  categories: ConsultantCategory[];
  consultants: User[];
  loading: boolean;
  error: string | null;
  createConsultation: (consultantId: number) => Promise<Consultation | null>;
}

const ConsultantContext = createContext<ConsultantContextType | undefined>(undefined);

interface ConsultantProviderProps {
  children: ReactNode;
}

export function ConsultantProvider({ children }: ConsultantProviderProps) {
  const { token } = useAuth();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [categories, setCategories] = useState<ConsultantCategory[]>([]);
  const [consultants, setConsultants] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const res = await fetch("http://localhost:4000/v1/consultant/categories", {
        headers,
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to fetch categories: ${errorData}`);
      }

      const result = await res.json();

      if (Array.isArray(result.data)) {
        setCategories(result.data);
        setConsultants(result.data[selectedCategoryIndex]?.users || []);
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
      setConsultants(categories[index].users || []);
    }
  };

  return (
    <ConsultantContext.Provider
      value={{
        selectedCategoryIndex,
        handleSelectCategory,
        categories,
        consultants,
        loading,
        error,
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
