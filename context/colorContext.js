"use client";
import React, { createContext, useContext } from "react";

// Define your color scheme
const colors = {
  defaultblue: "#0013BB",
  defaultwhite: "#fff",
  darkdefualtblue: "#000f96",
};

// Create the context
const ColorContext = createContext(colors);

// Custom hook for using the color context
export const useColors = () => useContext(ColorContext);

// ColorProvider component
export const ColorProvider = ({ children }) => {
  return (
    <ColorContext.Provider value={colors}>{children}</ColorContext.Provider>
  );
};
