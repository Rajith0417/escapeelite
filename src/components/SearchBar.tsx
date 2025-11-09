"use client";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  // REMOVED: onSearch? (query: string) => void;
  className?: string;
  query: string; // ⬅️ NEW: Controlled component value
  onQueryChange: (query: string) => void; // ⬅️ NEW: Handler for input changes
}

export default function SearchBar({
  placeholder = "Search destination...",
  className = "",
  query, // ⬅️ Use the controlled prop
  onQueryChange, // ⬅️ Use the new handler
}: SearchBarProps) {
  
  // 🛑 REMOVED: const [searchQuery, setSearchQuery] = useState("");

  // 🛑 REMOVED: handleSearch function and <form> element

  return (
    // 🛑 Removed <form> element and onSubmit, relying on the parent button
    <div className={`relative ${className}`}> 
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query} // ⬅️ Use the controlled 'query' prop
          onChange={(e) => onQueryChange(e.target.value)} // ⬅️ Call the new handler
          className="h-12 block w-full pl-10 pr-3 py-3 rounded-md bg-[#F3F4F6] text-gray-800 placeholder-gray-800 focus:outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
