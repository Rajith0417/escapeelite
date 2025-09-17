"use client";
import { useState } from "react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  value?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

export default function FilterDropdown({
  label,
  options,
  value,
  onSelect,
  className = "",
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect?.(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full bg-[#F3F4F6] rounded-md px-4 py-3 text-left focus:outline-none text-gray-800"
        >
          <span className="block truncate">
            {value || `${label}`}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
