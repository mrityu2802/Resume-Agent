import axios from "axios";
import { ChatResponse, ResumeAnalysis, UploadResponse } from "../types/resume";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

export const uploadResume = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await api.post<UploadResponse>(
      "/resume/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      analysis: {
        skills: [],
        experience: "",
        recommendations: [],
        improvements: [],
      },
      error: "Failed to upload resume",
    };
  }
};

export const chat = async (
  message: string,
  analysis: ResumeAnalysis | null
): Promise<ChatResponse> => {
  try {
    const response = await api.post("/chat", {
      message,
      analysis,
    });
    return response.data;
  } catch (error) {
    console.error("Chat error:", error);
    return {
      response: "",
    };
  }
};
