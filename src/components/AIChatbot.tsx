"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";
import { chatAI } from "@/lib/ai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Akwaaba! 🌸 Welcome to Adepa Market. I am your AI Artisan Assistant. Ask me anything about our handwoven cloths, custom jewelry, Bolga baskets, organic shea butter, or our shipping and return policies!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setIsLoading(true);

    try {
      // API call to Anthropic chatbot endpoint
      const response = await chatAI(userText, messages);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! My network connection stumbled. However, I can still recommend Kofi's Kente Krafts' beautiful Graduation Kente Stoles! Feel free to browse our categories.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[330px] sm:w-[380px] h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-indigo via-primary-indigo-light to-terracotta p-4 text-white flex justify-between items-center border-b-2 border-kente-gold">
            <div className="flex items-center gap-2">
              <div className="bg-kente-gold/25 p-1.5 rounded-full border border-kente-gold/50">
                <Sparkles className="h-4 w-4 text-kente-gold animate-spin-slow" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Adepa Assistant</h4>
                <p className="text-[10px] text-warm-sand/80">Online • Grounded on Catalog</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-300 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#faf9f6]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-terracotta text-white rounded-tr-none shadow-sm"
                      : "bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-sm"
                  }`}
                >
                  {/* Handle basic markdown bold and list rendering in chat */}
                  <span className="whitespace-pre-line">
                    {msg.content.split("\n").map((line, lIdx) => {
                      // bold text helper
                      let content: React.ReactNode = line;
                      if (line.includes("**")) {
                        const parts = line.split("**");
                        content = parts.map((part, pIdx) =>
                          pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-black">{part}</strong> : part
                        );
                      }
                      return <span key={lIdx}>{content}<br /></span>;
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-200 text-stone-600 rounded-2xl rounded-tl-none p-3 text-xs flex gap-1 items-center shadow-sm">
                  <div className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-stone-200 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about products, shipping, returns..."
              className="flex-1 border border-stone-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-terracotta focus:border-terracotta text-stone-800"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-primary-indigo hover:bg-primary-indigo-light text-white rounded-full p-2 disabled:opacity-40 transition-colors flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-stone-charcoal text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center border border-warm-border group relative"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <Bot className="h-6 w-6 text-kente-gold animate-pulse" />
            <span className="absolute -top-1 -right-1 bg-terracotta h-3 w-3 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 bg-terracotta h-3 w-3 rounded-full" />
            
            {/* Tooltip */}
            <span className="absolute right-14 bg-stone-800 text-white text-[10px] font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow pointer-events-none">
              Artisan Assistant
            </span>
          </>
        )}
      </button>
    </div>
  );
};
export default AIChatbot;
