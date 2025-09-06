"use client";
import Image from "next/image";
import React, { useState } from "react";

interface PopupProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

function Popup({children, isOpen, onClose}: PopupProps) {
  console.log("inside popup");
  
  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Open Button */}
      {/* <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Open Popup
      </button> */}

      {/* Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* Popup Box */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
            {children}
            <button
              onClick={() => onClose}
              className="text-gray-900 rounded-lg absolute top-5 right-5"
            >
              <Image
                src="/icons/close-b.svg"
                alt="Escape Elite"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
