"use client";

import React, { ChangeEvent, JSX, ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import RoomSelection from "./chatbot/RoomSelection";
import PriceCards from "./chatbot/PriceCards";
import Thankyou from "./chatbot/Thankyou";

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

interface Variation {
    name: string;
    estimatedPrice: number;
    isDefault: boolean;
}

interface FullEstimation {
    estimatedPrice: number;
    currency: string;
    //   companyId: string;
    //   breakdown: VariationBreakdown;
    //   countryInfo: CountryInfo;
    //   numberOfNights: number;
    variations: Variation[];
    selectedVariation: Variation;
}

interface EstimationPrice {
    priceText: string;
    fullEstimation: FullEstimation;
}

interface ApiResponse {
    sessionId: string;
    nextQuestion: {
        question?: Question | null;
        isComplete: boolean;
    };
    questionnaireConfig?: {
        welcomeMessage?: string;
        endingMessage?: string;
    };
    estimationPrice?: EstimationPrice;
}

interface Message {
    sender: "user" | "bot";
    text: string;
}

interface ChatbotProps {
    chatbotId: string;
    open?: boolean;
}

// const Chatbot: React.FC = () => {
function ChatbotMain({ chatbotId, open = false }: ChatbotProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [options, setOptions] = useState<string[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [currentEstimation, setCurrentEstimation] = useState<EstimationPrice | null>(null);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
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

    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

    const START_URL =
        "https://d5ulwibf6e.execute-api.ap-south-1.amazonaws.com/prod/api/v1/questionnaires/start";
    const RESPONSE_URL =
        "https://d5ulwibf6e.execute-api.ap-south-1.amazonaws.com/prod/api/v1/user-responses";

    const phone = "+442038921812";

    const handleDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedDate(e.target.value);
    };

    const formatDisplayedDate = () => {
        return selectedDate ? selectedDate : 'yyyy-mm-dd';
    };

    const handleContainerClick = () => {
        if (dateInputRef.current) {
            // Check for showPicker support before calling it
            if (dateInputRef.current.showPicker) {
                dateInputRef.current.showPicker();
            }
        }
    };


    // Initial request when chatbot loads
    useEffect(() => {
        startChat();
    }, []);

    const startChat = async (): Promise<void> => {
        try {
            const res = await fetch(START_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    questionnaireId: chatbotId,
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
            if (data.nextQuestion) {
                const q = data.nextQuestion?.question ?? null;
                const isCompleted = data.nextQuestion.isComplete;
                setCurrentQuestion(q);
                setIsCompleted(isCompleted);
                if (q) {
                    setMessages((prev) => [...prev, { sender: "bot", text: q.longText }]);
                    setOptions(q.answers?.map((a) => a.answer) ?? []);
                }

            }
        } catch (err) {
            console.error("Start error:", err);
            setError("Failed to start chat. Please refresh and try again.");
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    useEffect(() => {
        if (open) {
            const isDesktop = window.innerWidth >= 768;
            setIsOpen(isDesktop);
        }

    }, [open]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const isCallingOptions = (option: string) => {
        if (option == "Whatsapp") {
            handleWhatsAppCall();
        } else if (option == "Direct Call") {
            handleDirectCall();
        } else
            return;
    }

    // Send answer to /user-responses
    const sendAnswer = async (answer: string): Promise<void> => {
        if (!sessionId || !currentQuestion) return;

        setIsLoading(true);
        setError(null);

        // Add user message
        setMessages((prev) => [...prev, { sender: "user", text: answer }]);
        setOptions([]);

        isCallingOptions(answer);

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

            if (data.nextQuestion) {
                const q = data.nextQuestion?.question ?? null;
                const isCompleted = data.nextQuestion.isComplete;
                setCurrentQuestion(q);
                setIsCompleted(isCompleted);
                console.log("this is l ine 264 " + isCompleted);

                if (q) {
                    q.longText.split("\\n").map(line => {
                        line.trim();
                        console.log(line);
                        setMessages((prev) => [...prev, { sender: "bot", text: line }]);
                    })

                    setOptions(q.answers?.map((a) => a.answer) ?? []);
                }
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
            } else {
                console.log("else");

                const estimate = data.estimationPrice;
                if (estimate) {
                    setCurrentEstimation(estimate);
                }
                console.log(currentEstimation);
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
        return date.toLocaleDateString("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // const formatRoomInfo = (roomData: RoomInfoProps[]) => {
    //     roomData.map((r, i) => `Room:${i + 1}\nAdults:${r.adults}\nChildren:${r.children}\nChild Ages: ${r.childAges.join(", ") || "None"}`)
    //     .join("\n\n");
    // }

    // Get minimum date for date picker
    const getMinDate = (): string => {
        if (currentQuestion?.responseDomain?.validation?.minDate) {
            return currentQuestion.responseDomain.validation.minDate;
        }
        return new Date().toISOString().split("T")[0];
        // const date = new Date();
        // date.setMonth(date.getMonth());
        // return date.toISOString().split('T')[0];
    };

    // Get maximum date for date picker
    const getMaxDate = (): string => {
        if (currentQuestion?.responseDomain?.validation?.maxDate) {
            return currentQuestion.responseDomain.validation.maxDate;
        }
        return "";
        // return new Date().toISOString().split('T')[0];
    };

    const handleDirectCall = () => {
        window.location.href = `tel:${phone}`;
    };

    const handleWhatsAppCall = () => {
        // opens WhatsApp voice call screen if the app is installed
        window.location.href = `whatsapp://call?phone=${phone}`;
    };

    // Get appropriate placeholder text
    const getInputPlaceholder = (): string => {
        return "Type your message...";
    };

    // Render input based on question type
    const renderQuestionInput = (): JSX.Element | null => {
        // if (!currentQuestion) return null;
        console.log("===0=== " + isCompleted)
        if (!isCompleted) {
            console.log("if 2");
            console.log(currentQuestion?.shortText);
            console.log(options);


            switch (currentQuestion?.questionType) {
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
                    // return renderTextInput();
                    return null
                case "MULTI_SLIDER":
                    return <MultiSliderComponent />;
                case "MULTIPLE_FREE_FORM_TEXT":
                case "FREE_FORM_TEXT":
                    return <MultipleFreeFormText />;
                case "ROOM_SELECTION":
                    return <RoomSelection onSubmit={(payload) => sendAnswer(payload)} isLoading={isLoading} />;
                default:
                    // return renderTextInput();
                    return null;
            }
        } else {
            console.log("else 2");

            if (currentEstimation) {
                console.log("current estimation");

                return <PriceCards
                    selectedName={currentEstimation.fullEstimation.selectedVariation.name}
                    currency={currentEstimation?.fullEstimation.currency}
                    variations={currentEstimation?.fullEstimation.variations.map(v => ({
                        name: v.name,
                        estimatedPrice: v.estimatedPrice,
                        isDefault: v.isDefault
                    }))}
                    onSelect={(name) => console.log("User clicked:", name)}
                />
            }
            return <Thankyou />;
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
            return <p className="px-4 py-2 rounded-lg bg-red-100 text-red-800 text-sm">No sliders configured</p>;
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
                // const answer = sliders.map((slider) => ({
                //     [slider.shortText]: sliderValues[slider.id] || 0
                // }));

                // sendAnswer(JSON.stringify(answer));
                const formattedAnswer = sliders
                    .map(slider => {
                        const value = sliderValues[slider.id] || 0;
                        return `${slider.shortText}: ${value}/${slider.maxValue}`;
                    })
                    .join(', ');
                // Send that string to the bot
                sendAnswer(formattedAnswer);
            }
        };

        return (
            !isLoading && <div className="p-4 space-y-6 overflow-scroll">
                {sliders.map((slider, index) => (
                    <div key={slider.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-white text-base font-normal">
                                {slider.shortText}
                            </label>
                            <span className="text-white font-normal">
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
                            <span className="text-white text-base font-normal w-12">{slider.minLabel}</span>
                            <span className="text-white text-base font-normal w-12 text-right">{slider.maxLabel}</span>
                        </div>

                        {errors[slider.id] && (
                            <p className="text-xs text-red-500">{errors[slider.id]}</p>
                        )}
                    </div>
                ))}

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="font-normal text-md px-6 py-2.5 bg-white text-black rounded-full border border-white hover:bg-blue-50 disabled:opacity-50"
                >
                    {isLoading ? "..." : "Submit"}
                </button>
            </div>
        );
    };

    //Render multiple free form text
    const MultipleFreeFormText = (): JSX.Element | null => {
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
            return <p className="px-4 py-2 rounded-lg bg-red-100 text-red-800 text-sm">No form fields configured</p>;
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
                // const answer: Record<string, string> = {};
                // textFields.forEach((field) => {
                //     answer[field.label] = formData[field.id] || "";
                // });

                // sendAnswer(JSON.stringify(answer));
                const formattedAnswer = textFields
                    .map((field) => {
                        const value = formData[field.id] || "";
                        return `${field.label}: ${value}`;
                    })
                    .join(", ");

                sendAnswer(formattedAnswer);

            }
        };

        return (
            !isLoading ? <div className="p-4 space-y-4">
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
                            className="text-md font-normal w-full px-6 py-2.5 bg-transparent text-white rounded-[100px] border border-white focus:outline-0 placeholder-white"
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
                    className="font-normal text-md px-6 py-2.5 bg-white text-black rounded-[100px] border border-white disabled:hidden"
                >
                    {isLoading ? "..." : "Submit"}
                </button>
            </div> : null
        );
    };

    // Render date picker
    const renderDatePicker = (): JSX.Element | null => (
        !isLoading ? <div className="p-3 pl-[50px]">
            <div className="flex flex-col gap-3 items-start space-x-2">
                <div
                    className="relative flex min-w-1/2 flex-1 items-center justify-between rounded-full border border-white px-6 py-2.5 text-white cursor-pointer"
                    onClick={handleContainerClick}
                >
                    <span
                        className={`text-md font-normal ${selectedDate ? 'text-white' : 'text-white'}`}
                        aria-label="Displayed date"
                    >
                        {formatDisplayedDate()}
                    </span>
                    <input
                        type="date"
                        ref={dateInputRef} // Add the ref here
                        value={selectedDate}
                        onChange={handleDateChange}
                        min={getMinDate()}
                        max={getMaxDate()}
                        disabled={isLoading}
                        className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                        aria-label="Select date"
                    />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none">
                        {/* SVG path data for your calendar icon */}
                        <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </div>
                <button
                    onClick={handleDateSubmit}
                    disabled={!selectedDate || isLoading}
                    className="font-normal text-md px-6 py-2.5 bg-white text-black rounded-full border border-white disabled:hidden"
                >
                    {isLoading ? "..." : "Select"}
                </button>
            </div>
            {error && <p className="px-4 py-2 rounded-lg bg-red-100 text-red-800 text-sm">{error}</p>}
        </div> : null
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
            !isLoading ? <div className="p-3 pl-[50px]">
                <div className="flex items-start gap-3 flex-col space-x-2">
                    <select
                        value={selectedDropdown}
                        onChange={(e) => setSelectedDropdown(e.target.value)}
                        disabled={isLoading}
                        className="max-w-3/4 text-md font-normal flex-1 border text-white border-white rounded-[100px] px-6 py-2.5 focus-visible:border-[1px] focus:outline-0 focus:border-white disabled:bg-gray-100"
                        aria-label="Select from dropdown"
                    >
                        <option value="">Select an option</option>
                        {dropdownOptions.map((option, idx) => (
                            <option key={idx} value={option} className="bg-black text-white">
                                {option}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleDropdownSubmit}
                        disabled={!selectedDropdown || isLoading}
                        className="font-normal text-md px-4 py-2 border border-white bg-white text-black rounded-[100px] hover:outline-0 disabled:hidden"
                    >
                        {isLoading ? "..." : "Submit"}
                    </button>
                </div>
                {currentQuestion?.responseDomain?.validation?.required && (
                    <p className="text-xs text-white mt-1">This field is required</p>
                )}
                {error && <p className="px-4 py-2 rounded-lg bg-red-100 text-red-800 text-sm">{error}</p>}
            </div> : <div></div>
        );
    };

    // Render chip-style options (MCQ)
    const renderChipOptions = (): JSX.Element | null => (
        !isLoading ? <div className="p-3 pl-[50px] flex flex-wrap flex-col gap-3 items-start">
            {options.map((opt, idx) => (
                <button
                    key={idx}
                    onClick={() => sendAnswer(opt)}
                    disabled={isLoading}
                    className="font-poppins text-start px-6 py-2.5 bg-transparent text-white rounded-full border border-white font-normal text-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed disabled:hidden"
                >
                    {opt}
                </button>
            ))}
        </div> : null
    );

    // Render text input (fallback)
    const renderTextInput = (): JSX.Element | null => (
        <div className="p-3 pl-[50px]">
            <div className="flex items-center space-x-2">
                <input
                    value={input}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={getInputPlaceholder()}
                    disabled={isLoading}
                    className="text-md font-normal flex-1 border border-white text-white rounded-full px-4 py-2 focus:outline-0 disabled:hidden placeholder-white"
                />
                <button
                    onClick={handleSubmit}
                    disabled={!input.trim() || isLoading}
                    className="font-normal text-md px-4 py-2 bg-white text-black rounded-full disabled:hidden"
                >
                    {isLoading ? "..." : "Submit"}
                </button>
            </div>
            {error && <p className="px-4 py-2 rounded-lg bg-red-100 text-red-800 text-sm">{error}</p>}
        </div>
    );

    return (
        <div>
            {!isOpen && (
                <>
                    <button
                        onClick={toggleChat}
                        className="absolute right-0 bottom-0 w-[60px] h-[60px] md:w-[100px] md:h-[100px] cursor-pointer rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center bg-white"
                    >
                        <div className="relative w-[52px] h-[52px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden">
                            <Image
                                src={`${basePath}/images/user.png`}
                                alt="chatbot"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </button>
                    <div className="shadow-lg absolute bottom-[30px] right-[70px] md:bottom-[50px] md:right-[120px] translate-y-1/2 px-4 py-3 font-normal text-xs md:text-lg rounded-full bg-white text-gray-900 whitespace-nowrap">
                        Get Your Holiday Quote in 2 Minutes
                    </div>
                </>
            )}
            {isOpen && (
                <div className="backdrop-blur-[20px] bg-black/60 rounded-2xl shadow-xl w-full md:w-auto h-[calc(100vh-170px)] flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#38424B] px-4 py-3 flex items-center justify-between">
                        <Image
                            src={`${basePath}/logo.png`}
                            alt="Escape Elite"
                            width={50}
                            height={0}
                            className="h-8 w-auto object-cover"
                        />
                        <button onClick={startChat} className="px-4 py-2 bg-transparent text-white rounded-xl border border-white">
                            Restart Chat
                        </button>
                        {!open && <button
                            onClick={toggleChat}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <Image
                                src={`${basePath}/icons/close-w.svg`}
                                alt="Escape Elite"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                            />
                        </button>
                        }
                    </div>

                    {/* Chat messages */}
                    <div ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3">
                        {messages.map((message, idx) => (
                            <div
                                key={idx}
                                className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"
                                    }`}
                            >
                                {message.sender === "bot" ? (
                                    <div className="flex items-start gap-2 w-full">
                                        <Image
                                            src={`${basePath}/images/user.png`}
                                            alt={"chatbot"}
                                            width={10}
                                            height={10}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="font-poppins bg-white text-gray-900 whitespace-break-spaces px-4 py-4 rounded-2xl max-w-[75%] text-md font-normal">
                                            {message.text.replace(/\\n/g, '\n')}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start gap-2 flex-row-reverse w-full">
                                        <Image
                                            src={`${basePath}/images/user.png`}
                                            alt={"chatbot"}
                                            width={10}
                                            height={10}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="bg-white font-poppins border-white border whitespace-pre-line text-blue-400 px-6 py-2 rounded-2xl max-w-[75%] text-md font-normal">
                                            {message.text.replace(/\\n/g, '\n')}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex justify-start pl-[50px]">
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
                        {/* Dynamic input based on question type */}
                        {renderQuestionInput()}
                    </div>
                </div>
            )}

        </div>
    );
};

export default ChatbotMain;
