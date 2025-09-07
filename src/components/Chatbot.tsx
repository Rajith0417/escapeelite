"use client";

import React, { JSX, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import RoomSelection from "./chatbot/RoomSelection";

// Types for API response
interface Answer {
  answer: string;
}

interface ResponseDomain {
  type?: string;
  options?: string[];
  sliders?: Slider[];
  textFields?: TextField[];
  validation?: {
    allowedDates?: string[];
    minDate?: string;
    maxDate?: string;
    includeTime?: boolean;
    allowPastDates?: boolean;
    required?: boolean;

  };
}

interface TextField {
  id: string;
  label: string;
  type: string; // "text", "email", "tel", etc.
  required: boolean;
  placeholder?: string;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

interface Slider {
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  id: string;
  longText: string;
  shortText: string;
  minValue: number;
  maxValue: number;
  minLabel: string;
  maxLabel: string;
  required: boolean;
  renderCondition: string;
  crossValidations?: Array<{
    errorMessage: string;
    expression: string;
  }>;
};

interface Question {
  PK: string; // questionId
  shortText: string;
  longText: string;
  questionType: string; // "MCQ_SINGLE_CHOICE", "DATE_PICKER", "DROPDOWN", etc.
  responseDomain?: ResponseDomain;
  answers?: Answer[];
}

interface ApiResponse {
  sessionId: string;
  nextQuestion?: {
    question: Question;
    isComplete?: boolean;
  };
  questionnaireConfig?: {
    welcomeMessage?: string;
    endingMessage?: string;
  };
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rooms, setRooms] = useState([
    {
      roomTypeName: "STANDARD STAY",
      adults: 1,
      children: 0,
      childAges: [] as number[],
    },
  ]);

  const START_URL =
    "https://d5ulwibf6e.execute-api.ap-south-1.amazonaws.com/prod/api/v1/questionnaires/start";
  const RESPONSE_URL =
    "https://d5ulwibf6e.execute-api.ap-south-1.amazonaws.com/prod/api/v1/user-responses";

  // Initial request when chatbot loads
  useEffect(() => {
    const startChat = async (): Promise<void> => {
      try {
        const res = await fetch(START_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionnaireId: "f9abbd99-4a16-4ff1-953b-b80bed2f8b28",
            message: "Hello and welcome to Escape Elite!",
          }),
        });
        // MAIN_QUESTIONNAIRE : f9abbd99-4a16-4ff1-953b-b80bed2f8b28
        // CONTACT_US : 58257f11-ec99-4301-a358-35fddcc6cf15
        // HOTELS_&_RESORTS : b91db0d7-e9b2-4432-bc19-0c90f894f407
        // SRI_LANKA : cda93067-397c-404b-8130-c2e68c403508
        // MALDIVES : 3ea784df-e474-407d-928a-16f021bfa767

        const data: ApiResponse = await res.json();
        console.log("Start API:", data);

        setSessionId(data.sessionId);

        // Show welcome message if available
        if (data.questionnaireConfig?.welcomeMessage) {
          setMessages([
            { sender: "bot", text: data.questionnaireConfig.welcomeMessage },
          ]);
        }

        // Show first question
        if (data.nextQuestion?.question) {
          const q = data.nextQuestion.question;
          setCurrentQuestion(q);
          setMessages((prev) => [...prev, { sender: "bot", text: q.longText }]);
          setOptions(q.answers?.map((a) => a.answer) ?? []);
        }
      } catch (err) {
        console.error("Start error:", err);
        setError("Failed to start chat. Please refresh and try again.");
      }
    };

    startChat();
  }, []);

  // Send answer to /user-responses
  const sendAnswer = async (answer: string): Promise<void> => {
    if (!sessionId || !currentQuestion) return;

    setIsLoading(true);
    setError(null);

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: answer }]);
    setOptions([]);

    const body = {
      questionId: currentQuestion.PK,
      shortText: currentQuestion.shortText,
      answer,
      sessionId,
    };

    try {
      const res = await fetch(RESPONSE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data: ApiResponse = await res.json();
      console.log("Response API:", data);

      if (data.nextQuestion?.question) {
        const q = data.nextQuestion.question;
        setCurrentQuestion(q);
        setMessages((prev) => [...prev, { sender: "bot", text: q.longText }]);
        setOptions(q.answers?.map((a) => a.answer) ?? []);

        // Reset all input states when new question arrives
        setSelectedDate("");
        setSelectedDropdown("");
        setInput("");
      } else if (data.questionnaireConfig?.endingMessage) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data?.questionnaireConfig?.endingMessage ?? "",
          },
        ]);
        setCurrentQuestion(null);
      }
    } catch (err) {
      console.error("Response error:", err);
      const errorMessage =
        "Sorry, there was an error processing your response. Please try again.";
      setError(errorMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle manual text input
  const handleSubmit = (): void => {
    if (!input.trim() || isLoading) return;
    sendAnswer(input);
    setInput("");
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  // Handle date selection
  const handleDateSubmit = (): void => {
    if (!selectedDate.trim() || isLoading) return;
    const formattedDate = formatDateForDisplay(selectedDate);
    sendAnswer(formattedDate);
    setSelectedDate("");
  };

  // Handle dropdown selection
  const handleDropdownSubmit = (): void => {
    if (!selectedDropdown.trim() || isLoading) return;
    sendAnswer(selectedDropdown);
    setSelectedDropdown("");
  };

  // Clear error when user starts typing
  const handleInputChange = (value: string): void => {
    setInput(value);
    if (error) setError(null);
  };

  // Format date for display
  const formatDateForDisplay = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get minimum date for date picker
  const getMinDate = (): string => {
    if (currentQuestion?.responseDomain?.validation?.minDate) {
      return currentQuestion.responseDomain.validation.minDate;
    }
    return new Date().toISOString().split("T")[0];
  };

  // Get maximum date for date picker
  const getMaxDate = (): string => {
    if (currentQuestion?.responseDomain?.validation?.maxDate) {
      return currentQuestion.responseDomain.validation.maxDate;
    }
    return "";
  };

  // Get appropriate placeholder text
  const getInputPlaceholder = (): string => {
    return "Type your message...";
  };

  // Render input based on question type
  const renderQuestionInput = (): JSX.Element | null => {
    if (!currentQuestion) return null;

    switch (currentQuestion.questionType) {
      case "DATE_PICKER":
        return renderDatePicker();

      case "DROP_DOWN":
      case "SELECT":
        return renderDropdown();

      case "MCQ_SINGLE_CHOICE":
      case "MCQ_MULTIPLE_CHOICE":
        if (options.length > 0) {
          return renderChipOptions();
        }
        return renderTextInput();
      case "MULTI_SLIDER":
        return <MultiSliderComponent />;
      case "MULTIPLE_FREE_FORM_TEXT":
        return <MultipleFreeFormText />;
      case "ROOM_SELECTION":
        return roomSelection();
      // return <RoomSelection  onSubmit={(payload) => sendAnswer(payload)}/>;
      default:
        return renderTextInput();
    }
  };

  // Render multi slider
  const MultiSliderComponent: React.FC = () => {
    const [sliderValues, setSliderValues] = useState<Record<string, number>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Initialize slider values with defaults
    useEffect(() => {
      if (currentQuestion?.responseDomain?.sliders) {
        const initialValues: Record<string, number> = {};
        currentQuestion.responseDomain.sliders.forEach((slider) => {
          initialValues[slider.id] = slider.defaultValue || 0;
        });
        setSliderValues(initialValues);
      }
    }, [currentQuestion]);

    if (!currentQuestion?.responseDomain?.sliders) {
      return <div>No sliders configured</div>;
    }

    const sliders = currentQuestion.responseDomain.sliders;

    const handleSliderChange = (sliderId: string, value: number) => {
      setSliderValues((prev) => ({ ...prev, [sliderId]: value }));

      // Clear any previous errors for this slider
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[sliderId];
        return newErrors;
      });
    };

    const validateSliders = (): boolean => {
      const newErrors: Record<string, string> = {};
      let isValid = true;

      sliders.forEach((slider) => {
        const value = sliderValues[slider.id] || 0;

        // Check required field
        if (slider.required && value === 0) {
          newErrors[slider.id] = "This field is required";
          isValid = false;
        }

        // Check cross validations if they exist
        if (slider.crossValidations && slider.crossValidations.length > 0) {
          slider.crossValidations.forEach((validation) => {
            // Simple implementation of cross validation
            // Extract values from the expression string
            if (validation.expression.includes("Relaxation") &&
              validation.expression.includes("Extreme Adventure")) {
              // Find the relaxation and extreme adventure sliders
              const relaxationSlider = sliders.find(s => s.shortText === "Relaxation");
              const extremeAdventureSlider = sliders.find(s => s.shortText === "Extreme Adventure");

              if (relaxationSlider && extremeAdventureSlider) {
                const relaxationValue = sliderValues[relaxationSlider.id] || 0;
                const extremeAdventureValue = sliderValues[extremeAdventureSlider.id] || 0;

                // Check if the validation condition is met
                if (relaxationValue >= 6 && extremeAdventureValue >= 1) {
                  newErrors[extremeAdventureSlider.id] = validation.errorMessage;
                  isValid = false;
                }
              }
            }
          });
        }
      });

      setErrors(newErrors);
      return isValid;
    };

    const handleSubmit = () => {
      if (validateSliders()) {
        // Format the answer as an array of objects with slider labels and values
        const answer = sliders.map((slider) => ({
          [slider.shortText]: sliderValues[slider.id] || 0
        }));

        sendAnswer(JSON.stringify(answer));
      }
    };

    return (
      <div className="p-4 border-t bg-gray-50 space-y-6 overflow-scroll">
        {sliders.map((slider, index) => (
          <div key={slider.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-blue-400 text-base font-normal">
                {slider.shortText}
              </label>
              <span className="text-blue-400 font-normal">
                {sliderValues[slider.id] || 0}
              </span>
            </div>
            <input
              type="range"
              min={slider.minValue}
              max={slider.maxValue}
              step={slider.step || 1}
              value={sliderValues[slider.id] || 0}
              onChange={(e) => handleSliderChange(slider.id, parseInt(e.target.value))}
              className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center justify-between space-x-2">
              <span className="text-blue-400 text-base font-normal w-12">{slider.minLabel}</span>
              <span className="text-blue-400 text-base font-normal w-12 text-right">{slider.maxLabel}</span>
            </div>

            {errors[slider.id] && (
              <p className="text-xs text-red-500">{errors[slider.id]}</p>
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-2.5 bg-white text-blue-400 rounded-full border border-blue-400 hover:bg-blue-50 disabled:opacity-50"
        >
          {isLoading ? "..." : "Submit"}
        </button>
      </div>
    );
  };

  //Render multiple free form text
  const MultipleFreeFormText = (): JSX.Element => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Initialize form data - moved useEffect to top level
    useEffect(() => {
      if (currentQuestion?.responseDomain?.textFields) {
        const initialData: Record<string, string> = {};
        currentQuestion.responseDomain.textFields.forEach((field) => {
          initialData[field.id] = "";
        });
        setFormData(initialData);
      }
    }, [currentQuestion]);

    // Early return after hooks
    if (!currentQuestion?.responseDomain?.textFields) {
      return <div>No form fields configured</div>;
    }

    const textFields = currentQuestion.responseDomain.textFields;

    const handleInputChange = (fieldId: string, value: string) => {
      setFormData((prev) => ({ ...prev, [fieldId]: value }));

      // Clear error for this field
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    };

    const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};
      let isValid = true;

      textFields.forEach((field) => {
        const value = formData[field.id] || "";

        // Check required field
        if (field.required && !value.trim()) {
          newErrors[field.id] = "This field is required";
          isValid = false;
        }

        // Email validation
        if (field.type === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
          newErrors[field.id] = "Please enter a valid email address";
          isValid = false;
        }

        // Phone number validation (basic)
        if (field.type === "tel" && value && !/^[+]?[\d\s\-()]+$/.test(value)) {
          newErrors[field.id] = "Please enter a valid phone number";
          isValid = false;
        }

        // Min length validation
        if (field.validation?.minLength && value.length < field.validation.minLength) {
          newErrors[field.id] = `Must be at least ${field.validation.minLength} characters`;
          isValid = false;
        }

        // Max length validation
        if (field.validation?.maxLength && value.length > field.validation.maxLength) {
          newErrors[field.id] = `Must be at most ${field.validation.maxLength} characters`;
          isValid = false;
        }
      });

      setErrors(newErrors);
      return isValid;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        // Format the answer as an object with field labels and values
        const answer: Record<string, string> = {};
        textFields.forEach((field) => {
          answer[field.label] = formData[field.id] || "";
        });

        sendAnswer(JSON.stringify(answer));
      }
    };

    return (
      <div className="p-4 border-t bg-gray-50 space-y-4">
        {textFields.map((field) => (
          <div key={field.id} className="space-y-1">
            {/* <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label> */}
            <input
              type={field.type || "text"}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={field.placeholder || ""}
              className="w-full px-6 py-2.5 bg-white text-blue-400 rounded-[100px] border border-blue-400 focus:outline-0"
              aria-invalid={!!errors[field.id]}
              aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
            />
            {errors[field.id] && (
              <p id={`${field.id}-error`} className="text-xs text-red-500">
                {errors[field.id]}
              </p>
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-2.5 bg-white text-blue-400 rounded-[100px] border border-blue-400 disabled:hidden"
        >
          {isLoading ? "..." : "Submit"}
        </button>
      </div>
    );
  };

  // Render date picker
  const renderDatePicker = (): JSX.Element => (
    <div className="p-3 border-t bg-gray-50">
      <div className="flex flex-col gap-3 items-start space-x-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={getMinDate()}
          max={getMaxDate()}
          disabled={isLoading}
          className="min-w-1/2 flex-1 px-6 py-2.5 bg-bg-white text-blue-400 rounded-full border border-blue-400  focus:border-blue-400 disabled:bg-gray-100"
          aria-label="Select date"
        />
        <button
          onClick={handleDateSubmit}
          disabled={!selectedDate || isLoading}
          className="px-6 py-2.5 bg-white text-blue-400 rounded-full border border-blue-400 disabled:hidden"
        >
          {isLoading ? "..." : "Select"}
        </button>
      </div>
      {currentQuestion?.responseDomain?.validation?.minDate && (
        <p className="text-xs text-gray-500 mt-1">
          Minimum date:{" "}
          {formatDateForDisplay(
            currentQuestion.responseDomain.validation.minDate
          )}
        </p>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );

  // Render dropdown
  const renderDropdown = (): JSX.Element => {
    // For DROP_DOWN questions, options come from the answers array (same as options state)
    // For other dropdown types, try responseDomain.options as fallback
    const dropdownOptions =
      options.length > 0
        ? options
        : currentQuestion?.responseDomain?.options || [];

    return (
      <div className="p-3 border-t bg-gray-50">
        <div className="flex items-start gap-3 flex-col space-x-2">
          <select
            value={selectedDropdown}
            onChange={(e) => setSelectedDropdown(e.target.value)}
            disabled={isLoading}
            className="flex-1 border text-blue-400 border-blue-400 rounded-[100px] px-6 py-2.5 focus-visible:border-[1px] focus:outline-0 focus:border-blue-400 disabled:bg-gray-100"
            aria-label="Select from dropdown"
          >
            <option value="">Select an option</option>
            {dropdownOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={handleDropdownSubmit}
            disabled={!selectedDropdown || isLoading}
            className="px-4 py-2 border border-blue-400 bg-white text-blue-400 rounded-[100px] hover:outline-0 disabled:hidden"
          >
            {isLoading ? "..." : "Submit"}
          </button>
        </div>
        {currentQuestion?.responseDomain?.validation?.required && (
          <p className="text-xs text-gray-500 mt-1">This field is required</p>
        )}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  };

  // Render chip-style options (MCQ)
  const renderChipOptions = (): JSX.Element => (
    <div className="p-3 flex flex-wrap gap-2 border-t bg-white">
      {options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => sendAnswer(opt)}
          disabled={isLoading}
          className="px-6 py-2.5 bg-bg-white text-blue-400 rounded-full border border-blue-400 text-sm transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
        >
          {opt}
        </button>
      ))}
    </div>
  );

  //Render room selection
  const roomSelection = (): JSX.Element => {
    const updateRoom = (
      index: number,
      field: "adults" | "children",
      value: number
    ) => {
      setRooms((prev) => {
        const updated = [...prev];
        updated[index][field] = Math.max(0, value); // no negatives
        if (field === "children") {
          updated[index].childAges = Array(value).fill(0);
        }
        return updated;
      });
    };

    const updateChildAge = (roomIdx: number, childIdx: number, age: number) => {
      setRooms((prev) => {
        const updated = [...prev];
        updated[roomIdx].childAges[childIdx] = age;
        return updated;
      });
    };

    const totalOccupants = rooms.reduce(
      (acc, r) => acc + r.adults + r.children,
      0
    );

    return (
      <div className="p-3 border-t bg-gray-50 space-y-4">
        <p>Number of Rooms (1-10):</p>
        {rooms.map((room, idx) => (
          <div
            key={idx}
            className="p-3 border rounded-lg bg-white space-y-3 shadow-sm"
          >
            <p className="font-semibold">Room {idx + 1}</p>

            {/* Adults */}
            <div className="flex flex-row items-center space-x-2">
              <span className="flex-1">Adults</span>
              <div className="w-[145px] flex gap-6 px-6 py-3 items-center border border-blue-400 rounded-[100px]">
                <button
                  onClick={() => updateRoom(idx, "adults", room.adults - 1)}
                  className="flex justify-center items-center w-5 h-5 bg-white border border-blue-400 text-blue-400 rounded-[100%]"
                >
                  -
                </button>
                <span className="text-blue-400">{room.adults}</span>
                <button
                  onClick={() => updateRoom(idx, "adults", room.adults + 1)}
                  className="flex justify-center items-center w-5 h-5 bg-blue-400 border border-blue-400 text-white rounded-[100%]"
                >
                  +
                </button>
              </div>

            </div>

            {/* Children */}
            <div className="flex items-center space-x-2">
              <span className="flex-1">Children</span>
              <div className="w-[145px] flex gap-6 px-6 py-3 items-center border border-blue-400 rounded-[100px]">
                <button
                  onClick={() => updateRoom(idx, "children", room.children - 1)}
                  className="flex justify-center items-center w-5 h-5 bg-white border border-blue-400 text-blue-400 rounded-[100%]"
                >
                  -
                </button>
                <span>{room.children}</span>
                <button
                  onClick={() => updateRoom(idx, "children", room.children + 1)}
                  className="flex justify-center items-center w-5 h-5 bg-blue-400 border border-blue-400 text-white rounded-[100%]"
                >
                  +
                </button>
              </div>

            </div>

            {/* Child Ages */}
            {room.children > 0 && (
              <div className="flex items-center">
                <span className="flex-1 text-sm font-medium">Child Ages</span>
                {room.childAges.map((age, cIdx) => (
                  <select
                    key={cIdx}
                    value={age}
                    onChange={(e) =>
                      updateChildAge(idx, cIdx, parseInt(e.target.value))
                    }
                    className="w-[145px] border border-blue-400 rounded-[100px] px-6 py-3 focus:outline-0"
                  >
                    <option value={0}>-</option>
                    {Array.from({ length: 17 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Summary */}
        <p className="text-sm text-gray-600">
          Total occupants: {totalOccupants}
        </p>

        {/* Submit */}
        <button
          onClick={() => {
            const payload = JSON.stringify(rooms);
            sendAnswer(payload);
          }}
          disabled={isLoading}
          className="px-6 py-2.5 border border-blue-400 text-blue-400 rounded-[100px] hover:border-blue-400 disabled:hidden"
        >
          {isLoading ? "..." : "Submit"}
        </button>
      </div>
    );
  };

  // Render text input (fallback)
  const renderTextInput = (): JSX.Element => (
    <div className="p-3 border-t bg-gray-50">
      <div className="flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={getInputPlaceholder()}
          disabled={isLoading}
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:hidden"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 w-full md:w-auto h-[680px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[#38424B] px-4 py-3 flex items-center justify-between">
        <Image
          src="logo.png"
          alt="Escape Elite"
          width={50}
          height={0}
          className="h-8 w-auto object-cover"
        />
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"
              }`}
          >
            {message.sender === "bot" ? (
              <div className="flex items-start gap-2">
                <Image
                  src={"images/user.png"}
                  alt={"chatbot"}
                  width={10}
                  height={10}
                  className="w-10 h-10 rounded-full"
                />
                <div className="bg-blue-100 text-gray-800 px-4 py-2 rounded-2xl max-w-[75%]">
                  {message.text}
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 flex-row-reverse">
                <Image
                  src={"images/user.png"}
                  alt={"chatbot"}
                  width={10}
                  height={10}
                  className="w-10 h-10 rounded-full"
                />
                <div className="border-blue-400 border text-blue-400 px-6 py-2 rounded-full max-w-[75%]">
                  {message.text}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-800">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Error display */}
        {error && !isLoading && (
          <div className="flex justify-center">
            <div className="px-4 py-2 rounded-lg bg-red-100 text-red-800 text-sm">
              {error}
            </div>
          </div>
        )}
      </div>

      {/* Dynamic input based on question type */}
      {renderQuestionInput()}
    </div>
  );
};

export default Chatbot;
