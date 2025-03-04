"use server";
import axios from "axios";
import { ChatResponse, ResumeAnalysis, UploadResponse } from "../types/resume";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

export const uploadResume = async (
  file: File,
  model: string
): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("model", model);

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
  analysis: ResumeAnalysis | null,
  model: string
): Promise<ChatResponse> => {
  try {
    const response = await api.post("/chat", {
      message,
      analysis,
      model,
    });
    return response.data;
  } catch (error) {
    console.error("Chat error:", error);
    return {
      response: "",
    };
  }
};

export const getModels = async (): Promise<string[]> => {
  try {
    const response = await api.get("/models");
    return response.data;
  } catch (error) {
    console.error("Models error:", error);
    return [];
  }
};
