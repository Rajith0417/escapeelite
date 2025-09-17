"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Navbar() {
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDestinationsOpen, setIsMobileDestinationsOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLLIElement>(null);
  const mobileDropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close desktop dropdown if click is outside
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDestinationsOpen(false);
      }

      // Close mobile dropdown if click is outside (but not if clicking on mobile menu)
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileDestinationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDesktopDestinationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDestinationsOpen(!isDestinationsOpen);
  };

  const handleMobileDestinationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileDestinationsOpen(!isMobileDestinationsOpen);
  };

  const handleDestinationSelect = (destination: string) => {
    setIsDestinationsOpen(false);
    setIsMobileDestinationsOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu when destination is selected
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
    setIsMobileDestinationsOpen(false); // Also close mobile destinations dropdown
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileDestinationsOpen(false); // Close destinations dropdown when toggling mobile menu
  }

  return (
    <nav className="bg-transparent fixed w-full z-60 backdrop-blur-[20px]">
      <div className="absolute z-0 inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto flex justify-between items-center py-4 px-6 border-b-1 border-white border-solid">
        
        <Link href={`/landing-page`}>
          <Image
            src={`${basePath}/logo.png`}
            alt="Escape Elite"
            width={50}
            height={0}
            className="h-8 w-auto object-cover"
          /></Link>

        <button className="lg:hidden" onClick={handleMobileMenuToggle}>
          <Image
            src={`${basePath}/icons/hamberger.svg`}
            alt="Escape Elite"
            width={50}
            height={0}
            className="h-8 w-auto object-cover"
          />
        </button>

        {/* Mobile Menu */}
        <ul className={`${isMobileMenuOpen ? "flex" : "hidden"} flex-col absolute right-5 top-12 bg-black/60 backdrop-blur-[20px] rounded-lg lg:hidden space-y-0 font-medium min-w-[200px]`}>
          <li className="px-3 py-4">
            <Link
              onClick={handleMobileMenuClick}
              href="/"
              className="block text-white p-0 border-b-2 border-solid border-transparent hover:border-white"
            >
              Home
            </Link>
          </li>
          <li className="relative px-3 py-4" ref={mobileDropdownRef}>
            <button
              onClick={handleMobileDestinationsClick}
              className="text-white p-0 border-b-2 border-solid border-transparent hover:border-white flex items-center gap-1 w-full text-left"
            >
              Destinations
              <svg
                className={`w-4 h-4 transition-transform ${isMobileDestinationsOpen ? "rotate-180" : ""
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
            {isMobileDestinationsOpen && (
              <div className="mt-2 bg-white rounded-lg shadow-lg py-2 w-full">
                <Link
                  href="/sri-lanka"
                  onClick={() => handleDestinationSelect("Sri Lanka")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Sri Lanka
                </Link>
                <Link
                  href="/maldives"
                  onClick={() => handleDestinationSelect("Maldives")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Maldives
                </Link>
              </div>
            )}
          </li>
          <li className="px-3 py-4">
            <Link
              onClick={handleMobileMenuClick}
              href="/hotels"
              className="block text-white p-0 border-b-2 border-solid border-transparent hover:border-white"
            >
              Hotel Resorts
            </Link>
          </li>
          <li className="px-3 py-4">
            <Link
              onClick={handleMobileMenuClick}
              href="/attractions"
              className="block text-white p-0 border-b-2 border-solid border-transparent hover:border-white"
            >
              Attractions
            </Link>
          </li>
          <li className="px-3 py-4">
            <Link
              onClick={handleMobileMenuClick}
              href="/contact"
              className="block text-white p-0 border-solid border-transparent hover:border-white"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 font-medium">
          <li><Link href="/" className="block text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Home</Link></li>
          <li className="relative" ref={desktopDropdownRef}>
            <button
              onClick={handleDesktopDestinationsClick}
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
                  href="/sri-lanka"
                  onClick={() => handleDestinationSelect('Sri Lanka')}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Sri Lanka
                </Link>
                <Link
                  href="/maldives"
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
