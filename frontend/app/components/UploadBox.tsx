"use client";
import { useState } from "react";
import { UploadResponse } from "../types/resume";
import { uploadResume } from "../utils/api";

interface Props {
  onUploadSuccess: (analysis: UploadResponse) => void;
}

export const UploadBox = ({ onUploadSuccess }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    await handleFile(file);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await uploadResume(file);
      console.log(response);
      if (response.success) {
        onUploadSuccess(response);
      } else {
        setError(response.error || "Upload failed");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to upload file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`
        p-8 border-2 border-dashed rounded-lg text-center
        ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={handleFileInput}
      />

      <label htmlFor="fileInput" className="block cursor-pointer">
        <div className="text-gray-600">
          {isLoading ? (
            <p className="animate-pulse">Analyzing your resume...</p>
          ) : (
            <>
              <p>Drag and drop your resume here</p>
              <p className="text-sm mt-2">or click to browse</p>
            </>
          )}
        </div>
      </label>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};
