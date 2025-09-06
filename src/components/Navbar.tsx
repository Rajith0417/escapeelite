"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Navbar() {
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDestinationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <nav className="bg-transparent fixed w-full z-60 backdrop-blur-[20px]">
      <div className="relative container mx-auto flex justify-between items-center py-4 px-6 border-b-1 border-white border-solid">
        {/* <h1 className="text-xl font-bold text-blue-600"></h1> */}
        <Image
          src={`${basePath}/logo.png`}
          alt="Escape Elite"
          width={50}
          height={0}
          className="h-8 w-auto object-cover"
        />
        <button className="lg:hidden" onClick={handleMobileMenuToggle}>
          <Image
            src={`${basePath}/icons/hamberger.svg`}
            alt="Escape Elite"
            width={50}
            height={0}
            className="h-8 w-auto object-cover"
          />
        </button>

        <ul className={`${isMobileMenuOpen ? "flex" : "hidden"} hidden:lg flex-col absolute right-5 top-12 bg-black/60 backdrop-blur-[20px] rounded-lg lg:flex-row space-x-6 font-medium`}>
          <li className="px-3 py-4 lg:p-2">
            <Link
              onClick={handleMobileMenuClick}
              href="/"
              className="block text-white p-0 lg:p-2 border-b-2 border-solid border-transparent hover:border-white"
            >
              Home
            </Link>
          </li>
          <li className="relative px-3 py-4 lg:p-2" ref={dropdownRef}>
            <button
              onClick={handleDestinationsClick}
              className="text-white p-0 lg:p-2 border-b-2 border-solid border-transparent hover:border-white flex items-center gap-1"
            >
              Destinations
              <svg
                className={`w-4 h-4 transition-transform ${
                  isDestinationsOpen ? "rotate-180" : ""
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
            </button>
            {isDestinationsOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[150px] z-50">
                <Link
                  href={`${basePath}/sri-lanka`}
                  onClick={() => handleDestinationSelect("Sri Lanka")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Sri Lanka
                </Link>
                <Link
                  href={`${basePath}/maldives`}
                  onClick={() => handleDestinationSelect("Maldives")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Maldives
                </Link>
              </div>
            )}
          </li>
          <li className="px-3 py-4 lg:p-2">
            <Link
              onClick={handleMobileMenuClick}
              href="/hotels"
              className="block text-white p-0 lg:p-2 border-b-2 border-solid border-transparent hover:border-white"
            >
              Hotel Resorts
            </Link>
          </li>
          <li className="px-3 py-4 lg:p-2">
            <Link
              onClick={handleMobileMenuClick}
              href="/attractions"
              className="block text-white p-0 lg:p-2 border-b-2 border-solid border-transparent hover:border-white"
            >
              Attractions
            </Link>
          </li>
          <li className="px-3 py-4 lg:p-2">
            <Link
              onClick={handleMobileMenuClick}
              href="/contact"
              className="block text-white p-0 lg:p-2 border-b-2 border-solid border-transparent hover:border-white"
            >
              Contact
            </Link>
          </li>
        </ul>
        <ul className="hidden lg:flex space-x-6 font-medium">
          <li><Link href="/" className="block text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Home</Link></li>
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
                <Link
                  href={`${basePath}/sri-lanka`}
                  onClick={() => handleDestinationSelect('Sri Lanka')}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Sri Lanka
                </Link>
                <Link
                  href={`${basePath}/maldives`}
                  onClick={() => handleDestinationSelect('Maldives')}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Maldives
                </Link>
              </div>
            )}
          </li>
          <li><Link href="/hotels" className="block text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Hotel Resorts</Link></li>
          <li><Link href="/attractions" className="block text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Attractions</Link></li>
          <li><Link href="/contact" className="block text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
