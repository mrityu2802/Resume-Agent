import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  groqApiKey: process.env.GROQ_API_KEY,
  mongoUri: process.env.MONGO_URI,
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [
    "http://localhost:3000",
  ],
};

export const TEMPERATURE = 0.6;
export const MAX_TOKENS = 1024;

export const models = [
  "gemma2-9b-it",
  "llama-3.3-70b-versatile",
  "mixtral-8x7b-32768",
];
