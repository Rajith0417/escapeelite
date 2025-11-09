import { useRef } from "react";

interface Country {
  name: string;
  slug: string;
}

interface City {
  id: number;
  name: string;
}

interface Type {
  name: string;
  slug: string;
}

interface Rating {
  name: string;
  id: string;
}

type Option = Country | City | Type | Rating;

interface FilterDropdownProps {
  label: string;
  options: Option[];
  value: string; // The selected API key (slug/ID) managed by the parent
  onSelect: (value: string) => void;
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FilterDropdown({
  label,
  options,
  value, // This is the key (slug/ID), e.g., "sri-lanka" or "36"
  onSelect,
  className = "",
  isOpen,
  onToggle,
}: FilterDropdownProps) {
  
  // Helper to get the key (slug or ID string) from an option object
  const getKeyFromOption = (option: Option): string => {
      // Use explicit type checking for reliability
      if ('slug' in option) return option.slug;
      // Convert ID to string for consistent comparison with the 'value' prop
      if ('id' in option) return String(option.id); 
      return "";
  };

  // --- Logic to determine the button display text based on the 'value' prop ---
  
  // This variable holds the friendly name (e.g., "Sri Lanka") if a value is selected.
  let selectedOptionName = ''; 

  // 1. Check if a filter value (slug/ID) is present in the props
  if (value && options && options.length > 0) {
      // 2. If present, look up the corresponding friendly name (e.g., "Sri Lanka")
      const selectedOption = options.find((option) => {
          // Compare the incoming 'value' to the option's derived key
          // This ensures selected values show their friendly name on initial load/re-render.
          return getKeyFromOption(option) === value;
      });

      // 3. If a match is found, store the name.
      if (selectedOption) {
          selectedOptionName = selectedOption.name;
      }
  }
  
  // If selectedOptionName is not found (meaning value is "" or key is invalid), default to the 'label'.
  const buttonText = selectedOptionName || label;


  return (
    <div className={`relative ${className}`}>
      <button
        onClick={onToggle}
        className="relative w-full bg-[#F3F4F6] rounded-md px-4 py-3 text-left focus:outline-none text-gray-800"
      >
        {/* Display the correctly derived buttonText (selected name or default label) */}
        {buttonText} 
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
          {options && options.length > 0 ? options.map((option) => {
            
            // 1. DERIVE THE DISPLAY LABEL (Name)
            const optionLabel = option.name; 

            // 2. DERIVE THE API VALUE/KEY (Slug or ID) using the helper
            const optionValue = getKeyFromOption(option); 
              
            const key = optionValue || optionLabel;

            return (
              <li
                key={key} 
                onClick={() => {
                  // Pass the KEY/SLUG/ID string to the parent
                  onSelect(optionValue);
                  onToggle(); // close after selection
                }}
                className="block w-full text-left px-4 py-2 text-md text-gray-800 hover:bg-gray-100 focus:outline-none"
              >
                {optionLabel}
              </li>
            );
          }) : (
            <li key="no-options" className="px-4 py-2 text-sm text-gray-500">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
}
