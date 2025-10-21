import { useRef } from "react";

interface Country {
  name: string;
  slug: string;
}

interface Location {
  id: number;
  name: string;
}

interface Type {
  name: string;
  slug: string;
}

interface Rating {
  name: string;
  id: number;
}

type Option = Country | Location | Type | Rating;

interface FilterDropdownProps {
  label: string;
  options: Option[];
  value: string;
  onSelect: (value: string) => void;
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FilterDropdown({
  label,
  options,
  value,
  onSelect,
  className = "",
  isOpen,
  onToggle,
}: FilterDropdownProps) {
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={onToggle}
        className="relative w-full bg-[#F3F4F6] rounded-md px-4 py-3 text-left focus:outline-none text-gray-800"
      >
        {value || label}
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
          {options.map((option) => {
            // Derive a display label (works for all types)
            const optionLabel =
              (option as Country).name ??
              (option as Location).name ??
              (option as Type).name ??
              (option as Rating).name ??
              "";

            const key =
              (option as Country).slug ??
              (option as Type).slug ??
              (option as Location).id ??
              (option as Rating).id ??
              optionLabel;

            return (
              <li
                key={key}
                onClick={() => {
                  onSelect(optionLabel);
                  onToggle(); // close after selection
                }}
                className="block w-full text-left px-4 py-2 text-md text-gray-800 hover:bg-gray-100 focus:outline-none"
              >
                {optionLabel}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
