"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDestinationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDestinationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDestinationsOpen(!isDestinationsOpen);
  };

  const handleDestinationSelect = (destination: string) => {
    setIsDestinationsOpen(false);
    // You can add navigation logic here based on the selected destination
    console.log(`Selected destination: ${destination}`);
  };

  return (
    <nav className="bg-transparent fixed w-full z-60 backdrop-blur-[30px]">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 border-b-1 border-white border-solid">
        {/* <h1 className="text-xl font-bold text-blue-600"></h1> */}
        <Image
          src="logo.png"
          alt="Escape Elite"
          width={50}
          height={0}
          className="h-8 w-auto object-cover"
        />
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><a href="#home" className="block text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Home</a></li>
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={handleDestinationsClick}
              className="text-white p-2 border-b-2 border-solid border-transparent hover:border-white flex items-center gap-1"
            >
              Destinations
              <svg 
                className={`w-4 h-4 transition-transform ${isDestinationsOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDestinationsOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[150px] z-50">
                <button
                  onClick={() => handleDestinationSelect('Sri Lanka')}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Sri Lanka
                </button>
                <button
                  onClick={() => handleDestinationSelect('Maldives')}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Maldives
                </button>
              </div>
            )}
          </li>
          <li><a href="#resorts" className="block text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Hotel Resorts</a></li>
          <li><a href="#attractions" className="block text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Attractions</a></li>
          <li><a href="#contact" className="block text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
