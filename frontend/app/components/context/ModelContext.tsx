"use client";

import { ResumeAnalysis } from "@/app/types/resume";
import { Message } from "@/app/types/resume";
import { getModels } from "@/app/utils/api";
import { createContext, useEffect, useState } from "react";
type ModelContextType = {
  model: string;
  setModel: (model: string) => void;
  models: string[];
  isFetchingModels: boolean;
  analysis: ResumeAnalysis | null;
  setAnalysis: (analysis: ResumeAnalysis | null) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const ModelContext = createContext<ModelContextType | null>(null);

export default function ModelContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
      value={{
        model,
        setModel,
        models,
        isFetchingModels,
        analysis,
        setAnalysis,
        messages,
        setMessages,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}
