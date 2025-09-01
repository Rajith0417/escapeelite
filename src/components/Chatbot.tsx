"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

interface ResponseOption {
  id: string;
  text: string;
  action: () => void;
}

interface ChatbotProps {
  questionnaireId?: string;
  className?: string;
}

export default function Chatbot({
  questionnaireId = "f9abbd99-4a16-4ff1-953b-b80bed2f8b28",
  className = "",
}: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello and welcome to Escape Elite!",
      sender: "bot",
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "Ready to get started?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const responseOptions: ResponseOption[] = [
    {
      id: "1",
      text: "Yes, let's build my dream holiday!",
      action: () => handleResponse("Yes, let's build my dream holiday!"),
    },
    {
      id: "2",
      text: "I'd prefer to speak to a holiday specialist.",
      action: () =>
        handleResponse("I'd prefer to speak to a holiday specialist."),
    },
    {
      id: "3",
      text: "I'd prefer to chat with a holiday specialist.",
      action: () =>
        handleResponse("I'd prefer to chat with a holiday specialist."),
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleResponse = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Great! I'll help you plan your perfect holiday. Let me ask you a few questions to understand your preferences better.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "That's interesting! Tell me more about your travel preferences.",
        "I understand. Let me help you find the perfect destination.",
        "Great choice! What's your budget range for this trip?",
        "I'd be happy to help you plan that. When are you thinking of traveling?",
        "That sounds wonderful! How many people will be traveling with you?",
        "Perfect! Let me suggest some amazing destinations for you.",
        "I see! What type of accommodation do you prefer?",
        "Excellent! What activities are you most interested in during your trip?",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed bottom-22 right-6 ${isOpen ? "left-6 md:left-1/2" : ""} z-50 ${className}`}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <>
        <button
          onClick={toggleChat}
          className="w-[60px] h-[60px] md:w-[120px] md:h-[120px] cursor-pointer rounded-full shadow-lg transition-all duration-200 hover:scale-105 relative flex items-center justify-center bg-white"
        >
          <div className="relative w-[52px] h-[52px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden">
            <Image
              src="/images/user.png"
              alt="chatbot"
              fill
              className="object-cover"
            />
          </div>
        </button>
        <div className="shadow-lg absolute bottom-[30px] right-[70px] md:bottom-[60px] md:right-[130px] translate-y-1/2 px-4 py-3 font-normal text-xs md:text-xl rounded-full bg-white whitespace-nowrap">
          Get Your Holiday Quote in 2 Minutes
        </div>
        </>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 w-full md:w-auto h-[600px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[rgba(56,66,75,0.5)] px-4 py-3 flex items-center justify-between">
            <div className="">
              <Image
                src="logo.png"
                alt="Escape Elite"
                width={50}
                height={0}
                className="h-8 w-auto object-cover"
              />
            </div>
            <button
              onClick={toggleChat}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Image
                src="icons/closeW.svg"
                alt="Escape Elite"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-white">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="flex items-start gap-2">
                      {/* Bot Avatar */}
                      <Image
                        src={"images/user.png"}
                        alt={"chatbot"}
                        width={10}
                        height={10}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="bg-blue-100 text-gray-800 px-4 py-2 rounded-2xl max-w-xs">
                        {message.text}
                      </div>
                    </div>
                  )}
                  {message.sender === "user" && (
                    <div className="border-blue-400 border text-blue-400 px-6 py-2 rounded-full max-w-xs">
                      {message.text}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <div className="bg-blue-100 text-gray-800 px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Response Options - only show initially */}
            {messages.length === 2 && (
              <div className="mt-6 ml-12 space-y-3 flex flex-col items-start">
                {responseOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={option.action}
                    className="text-left bg-white border border-blue-400 text-blue-400 px-4 py-3 rounded-full hover:bg-blue-50 transition-colors text-sm"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === "" || isTyping}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
