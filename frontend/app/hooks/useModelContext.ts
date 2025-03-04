"use client";
import { useContext } from "react";
import { ModelContext } from "../components/context/ModelContext";

export const useModelContext = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error(
      "useModelContext must be used within a ModelContextProvider"
    );
  }
  return context;
};
