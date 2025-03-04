"use client";
import { UploadBox } from "./components/UploadBox";
import { AnalysisDisplay } from "./components/AnalysisDisplay";
import { ChatInterface } from "./components/ChatInterface";
import { UploadResponse } from "./types/resume";
import { chat } from "./utils/api";
import { useModelContext } from "./hooks/useModelContext";
import { Loader2 } from "lucide-react";

export default function Home() {
  const {
    model,
    isFetchingModels,
    analysis,
    setAnalysis,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
  } = useModelContext();

  const handleUploadSuccess = (response: UploadResponse) => {
    setAnalysis(response.analysis);
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

      setMessages((prev) => [...prev, { role: "user", content: message }]);

      const data = await chat(message, analysis, model);
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
  if (isFetchingModels) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <main className="flex-1 h-full bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {!analysis ? (
          <div className="max-w-full mx-auto">
            <UploadBox onUploadSuccess={handleUploadSuccess} />
          </div>
        ) : (
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
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
