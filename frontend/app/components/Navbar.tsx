"use client";
import { useModelContext } from "../hooks/useModelContext";
import { Loader2 } from "lucide-react";
export default function Navbar() {
  const { setModel, models, isFetchingModels, model } = useModelContext();

  return (
    <header  className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold">Resume AI</h1>
      <div className="flex items-center">
        {isFetchingModels ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <select
            className="py-2 px-4 border rounded"
            disabled={isFetchingModels}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        )}
      </div>
    </header>
  );
}
