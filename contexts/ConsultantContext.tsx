"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ConsultantContextType {
  selectedCategoryIndex: number;
  setSelectedCategoryIndex: (index: number) => void;
}

const ConsultantContext = createContext<ConsultantContextType | undefined>(undefined);

interface ConsultantProviderProps {
  children: ReactNode;
}

export function ConsultantProvider({ children }: ConsultantProviderProps) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  return (
    <ConsultantContext.Provider value={{ selectedCategoryIndex, setSelectedCategoryIndex }}>
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