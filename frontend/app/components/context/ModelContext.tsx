"use client";

import { getModels } from "@/app/utils/api";
import { createContext, useEffect, useState } from "react";
type ModelContextType = {
  model: string;
  setModel: (model: string) => void;
  models: string[];
  isFetchingModels: boolean;
};

export const ModelContext = createContext<ModelContextType | null>(null);

export default function ModelContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [model, setModel] = useState<string>("gemma2-9b-it");
  const [models, setModels] = useState<string[]>([]);
  const [isFetchingModels, setIsFetchingModels] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setIsFetchingModels(true);
        const models = await getModels();
        setModels(models);
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setIsFetchingModels(false);
      }
    };
    fetchModels();
  }, []);

  return (
    <ModelContext.Provider
      value={{ model, setModel, models, isFetchingModels }}
    >
      {children}
    </ModelContext.Provider>
  );
}
