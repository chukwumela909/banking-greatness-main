"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define interfaces for the form data
interface SignUpFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dob?: string;
  motherMaidenName?: string;
  ssn?: string;
  accountType?: "savings" | "checking" | "";
  password?: string;
  confirmPassword?: string;
}

// Define the context type
interface SignUpContextType {
  formData: SignUpFormData;
  setFormData: (data: Partial<SignUpFormData>) => Promise<void>;
}

// Create the context
const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

// Export a custom hook for using this context
export function useSignUpContext() {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useSignUpContext must be used within a SignUpProvider");
  }
  return context;
}

// Define the provider component
interface SignUpProviderProps {
  children: ReactNode;
}

export const SignUpProvider: React.FC<SignUpProviderProps> = ({ children }) => {
  const [formData, setFormDataState] = useState<SignUpFormData>({});

  const setFormData = (newData: Partial<SignUpFormData>) => {
    return new Promise<void>((resolve) => {
      setFormDataState((prevData) => {
        const updatedData = { ...prevData, ...newData };
        resolve();
        return updatedData;
      });
    });
  };

  return (
    <SignUpContext.Provider value={{ formData, setFormData }}>
      {children}
    </SignUpContext.Provider>
  );
};
