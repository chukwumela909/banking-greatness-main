"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define interfaces for the form data
interface LoginFormData {
  email?: string;
  password?: string;
}

// Define the context type
interface LoginContextType {
  formData: LoginFormData;
  setFormData: (data: LoginFormData) => void;
}

// Create the context
const LoginContext = createContext<LoginContextType | undefined>(undefined);

// Export a custom hook for using this context
export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
}

// Define the provider component
interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<LoginFormData>({});

  const updateFormData = (newData: LoginFormData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <LoginContext.Provider value={{ formData, setFormData: updateFormData }}>
      {children}
    </LoginContext.Provider>
  );
};
