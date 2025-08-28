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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <span className="block truncate">
            {value || `Select ${label.toLowerCase()}`}
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
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
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