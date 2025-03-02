"use client";
import { useState } from "react";
import { UploadBox } from "./components/UploadBox";
import { AnalysisDisplay } from "./components/AnalysisDisplay";
import { ResumeAnalysis, UploadResponse } from "./types/resume";

export default function Home() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  const handleUploadSuccess = (response: UploadResponse) => {
    setAnalysis(response.analysis);
  };

  const handleReset = () => {
    setAnalysis(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Resume Review Agent
        </h1>

        {!analysis ? (
          <div className="max-w-xl mx-auto">
            <UploadBox onUploadSuccess={handleUploadSuccess} />
          </div>
        ) : (
          <AnalysisDisplay analysis={analysis} onReset={handleReset} />
        )}
      </div>
    </main>
  );
}
