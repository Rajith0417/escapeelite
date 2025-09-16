"use client";

import React from "react";

interface Variation {
  name: string;
  estimatedPrice: number;
  isDefault: boolean;
}

interface PriceCardsProps {
  selectedName: string;               // e.g. "Budget"
  currency: string;                   // e.g. "GBP"
  variations: Variation[];
  onSelect?: (name: string) => void;  // optional click handler
}

const PriceCards: React.FC<PriceCardsProps> = ({
  selectedName,
  currency,
  variations,
  onSelect,
}) => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white rounded-2xl p-6 space-y-6 max-w-md mx-auto text-center">
      {/* top tick and thanks */}
      <div className="flex flex-col items-center space-y-3">
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-green-600">Thank you!</h2>
        <p className="text-gray-700">Thank you for your response</p>
      </div>

      {/* price options */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-800">
          Your Price Options:
        </h3>
        {variations.map((v) => {
          const selected = v.name === selectedName;
          return (
            <div
              key={v.name}
              onClick={() => onSelect?.(v.name)}
              className={`flex justify-between items-center rounded-xl border p-4 cursor-pointer transition
                 ${selected
                   ? "bg-green-50 border-green-500"
                   : "bg-white border-gray-200 hover:border-green-400"}`}
            >
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">{v.name}</span>
                {selected && (
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>
              <span className="text-green-600 font-medium">
                {currency} {v.estimatedPrice.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceCards;
