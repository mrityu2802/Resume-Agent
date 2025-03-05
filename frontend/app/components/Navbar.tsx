"use client";
import { useModelContext } from "../hooks/useModelContext";
import { Loader2 } from "lucide-react";
export default function Navbar() {
  const { setModel, models, isFetchingModels, model, setAnalysis } =
    useModelContext();

  return (
    <header className="flex justify-between items-center p-4">
      <button
        className="text-2xl font-bold cursor-pointer"
        onClick={() => setAnalysis(null)}
      >
        Resume AI
      </button>
      <div className="flex items-center">
        {isFetchingModels ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : models.length ? (
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
        ) : (
          <span className="py-1.5 px-4 w-[215px] border rounded">{model}</span>
        )}
      </div>
    </header>
  );
}
