"use client";
import { useState } from "react";
import { UploadBox } from "./components/UploadBox";
import { AnalysisDisplay } from "./components/AnalysisDisplay";
import { ChatInterface } from "./components/ChatInterface";
import { ResumeAnalysis, UploadResponse, Message } from "./types/resume";
import { chat } from "./utils/api";

export default function Home() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadSuccess = (response: UploadResponse) => {
    setAnalysis(response.analysis);
    // Initialize chat with AI welcome message
    setMessages([
      {
        role: "assistant",
        content:
          "I've analyzed your resume. Feel free to ask me any questions about improving it or about your career path!",
      },
    ]);
  };

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      // Add user message to chat
      setMessages((prev) => [...prev, { role: "user", content: message }]);

      // Send message to API
      const data = await chat(message, analysis);
      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setMessages([]);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl text-black font-bold text-center mb-8">
          Resume Review Agent
        </h1>

        {!analysis ? (
          <div className="max-w-xl mx-auto">
            <UploadBox onUploadSuccess={handleUploadSuccess} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 h-full overflow-hidden">
            <AnalysisDisplay analysis={analysis} onReset={handleReset} />
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </main>
  );
}
