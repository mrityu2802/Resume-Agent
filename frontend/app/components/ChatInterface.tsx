import { useState, useRef, useEffect } from "react";
import { Message } from "../types/resume";
import ReactMarkdown from "react-markdown";

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInterface({
  messages,
  onSendMessage,
  isLoading,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col h-[800px] text-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold truncate">
          Chat with AI Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg text-slate-700 ${
              message.role === "user"
                ? "bg-blue-100 ml-auto max-w-[80%]"
                : "bg-gray-100 mr-auto max-w-[80%]"
            }`}
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="prose prose-sm max-w-none">{children}</p>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 rounded-lg p-3 mr-auto max-w-[80%] animate-pulse">
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your resume or career advice..."
          className="flex-1 p-2 border rounded"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}
