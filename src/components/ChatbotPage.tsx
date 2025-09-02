"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { QuestionnaireService, type Questionnaire } from "@/utils/questionnaireService";

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

// Question and Questionnaire interfaces are now imported from the service

interface ChatbotProps {
  questionnaireId?: string;
  className?: string;
}

export default function ChatbotPage({
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
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isQuestionnaireActive, setIsQuestionnaireActive] = useState(false);
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

  // Load questionnaire data using the service
  const loadQuestionnaire = useCallback(async () => {
    try {
      const questionnaireData = await QuestionnaireService.getQuestionnaire(questionnaireId);
      if (questionnaireData) {
        setQuestionnaire(questionnaireData);
        console.log(`Loaded questionnaire: ${questionnaireData.title} (ID: ${questionnaireId})`);
      } else {
        console.error(`Questionnaire not found for ID: ${questionnaireId}`);
      }
    } catch (error) {
      console.error("Failed to load questionnaire:", error);
    }
  }, [questionnaireId]);

  useEffect(() => {
    loadQuestionnaire();
  }, [questionnaireId, loadQuestionnaire]);

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

    // Check if user wants to start questionnaire
    if (text.includes("build my dream holiday")) {
      setIsQuestionnaireActive(true);
      setCurrentQuestionIndex(0);
      
      setTimeout(() => {
        if (questionnaire && questionnaire.questions.length > 0) {
          const firstQuestion = questionnaire.questions[0];
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: `Great! Let's start with the first question: ${firstQuestion.text}`,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
        }
      }, 1000);
    } else {
      // Handle other responses
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I understand you'd prefer to speak with a specialist. Let me connect you with one of our holiday experts who can provide personalized assistance.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const userInput = inputMessage.trim();
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Handle questionnaire responses
    if (isQuestionnaireActive && questionnaire) {
      const currentQuestion = questionnaire.questions[currentQuestionIndex];
      
      // Store the answer
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: userInput
      }));

      // Move to next question or complete questionnaire
      setTimeout(async () => {
        const nextIndex = currentQuestionIndex + 1;
        
        if (nextIndex < questionnaire.questions.length) {
          // Ask next question
          setCurrentQuestionIndex(nextIndex);
          const nextQuestion = questionnaire.questions[nextIndex];
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: `Thank you! Next question: ${nextQuestion.text}`,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          // Questionnaire complete
          setIsQuestionnaireActive(false);
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Perfect! I have all the information I need. Based on your preferences, I'll create a personalized holiday quote for you. Our specialist will contact you within 24 hours with your custom itinerary and pricing.",
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
          
          // Submit the completed questionnaire
          const finalAnswers = { ...answers, [currentQuestion.id]: userInput };
          const response = {
            questionnaireId,
            answers: finalAnswers,
            timestamp: new Date()
          };
          
          try {
            const result = await QuestionnaireService.submitQuestionnaire(response);
            console.log("Questionnaire submitted successfully:", result);
          } catch (error) {
            console.error("Failed to submit questionnaire:", error);
          }
        }
        setIsTyping(false);
      }, 1500);
    } else {
      // Regular chat responses
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
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`  ${className}`}>
      {/* Chat Window */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 w-full md:w-auto h-auto flex flex-col overflow-hidden">
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
            {messages.length === 2 && !isQuestionnaireActive && (
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

            {/* Questionnaire Options */}
            {isQuestionnaireActive && questionnaire && (
              <div className="mt-6 ml-12 space-y-3 flex flex-col items-start">
                {questionnaire.questions[currentQuestionIndex]?.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage(option);
                      handleSendMessage();
                    }}
                    className="text-left bg-white border border-blue-400 text-blue-400 px-4 py-3 rounded-full hover:bg-blue-50 transition-colors text-sm"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {/* <div className="border-t border-gray-200 p-4 bg-white">
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
          </div> */}
        </div>
    </div>
  );
}
