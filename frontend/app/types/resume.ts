export interface ResumeAnalysis {
  skills: string[];
  experience: string;
  recommendations: string[];
  improvements: string[];
}

export interface UploadResponse {
  success: boolean;
  analysis: ResumeAnalysis;
  error?: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
  analysis: ResumeAnalysis;
}

export interface ChatResponse {
  response: string;
}

export interface ErrorResponse {
  error: string;
}
