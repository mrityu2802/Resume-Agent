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
