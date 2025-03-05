"use client";
import { useState } from "react";
import { UploadResponse } from "../types/resume";
import { uploadResume } from "../utils/api";
import { useModelContext } from "../hooks/useModelContext";
import { toast } from "react-hot-toast";
interface Props {
  onUploadSuccess: (analysis: UploadResponse) => void;
}

export const UploadBox = ({ onUploadSuccess }: Props) => {
  const { model } = useModelContext();
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
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 2MB limit");
      setIsLoading(false);
      toast.error("File size exceeds 2MB limit");
      return;
    }

    try {
      const response = await uploadResume(file, model);
      console.log(response);
      if (response.success) {
        onUploadSuccess(response);
        toast.success("Resume uploaded successfully");
      } else {
        setError(response.error || "Upload failed");
        toast.error(response.error || "Upload failed");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to upload file");
      toast.error("Failed to upload file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Resume Analysis Assistant
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <div className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Instant Analysis</h3>
              <p className="text-sm text-gray-600">
                Get detailed insights about your resume in seconds
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Secure Upload</h3>
              <p className="text-sm text-gray-600">
                Your data is secured and never stored
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Smart Analysis</h3>
              <p className="text-sm text-gray-600">
                AI-powered feedback and suggestions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`
          p-8 border-2 border-dashed rounded-lg text-center max-w-xl mx-auto
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/50
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
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </div>

            <div className="text-gray-600">
              {isLoading ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-2" />
                    <p>Analyzing your resume...</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    This may take a few moments
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-lg font-medium">
                    Drag and drop your resume here
                  </p>
                  <p className="text-sm mt-2">or click to browse files</p>
                  <div className="mt-4 text-xs text-gray-500">
                    <p>Accepted file types: PDF, DOC, DOCX</p>
                    <p className="mt-1">Maximum file size: 2MB</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </label>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
