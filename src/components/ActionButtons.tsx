"use client";

import React, { useEffect } from "react";
import Image from "next/image";
declare global {
  interface Window {
    tidioChatApi?: {
      open: () => void;
      on: (event: string, callback: () => void) => void;
    };
  }
}

function ActionButtons() {

  const phone = "+442038921812";
  const tidioKey = "<your-public-key>";

  useEffect(() => {
    // Inject Tidio script dynamically if not already loaded
    if (!document.getElementById("tidio-script")) {
      const s = document.createElement("script");
      s.id = "tidio-script";
      s.src = `//code.tidio.co/${tidioKey}.js`;
      s.async = true;
      document.body.appendChild(s);
    }

    // Optional: listen for when Tidio is ready
    const checkReady = () => {
      window.tidioChatApi?.on("ready", () => {
        console.log("Tidio widget ready");
      });
    };

    // If script is already loaded, call immediately
    if (window.tidioChatApi) {
      checkReady();
    } else {
      // Otherwise, poll until tidioChatApi exists
      const interval = setInterval(() => {
        if (window.tidioChatApi) {
          clearInterval(interval);
          checkReady();
        }
      }, 500);
    }
  }, [tidioKey]);

  const handleDirectCall = () => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsAppCall = () => {
    // opens WhatsApp voice call screen if the app is installed
    window.location.href = `whatsapp://call?phone=${phone}`;
  };

  const handleTidioMessage = () => {
    window.tidioChatApi?.open();
  };

  return (
    <div
      className="
        fixed 
        bottom-20 
        left-0 
        top-1/2
        -translate-y-1/2
        md:right-0 md:left-auto
        flex flex-col gap-4
        z-50
        h-fit
      "
    >
      {/* Phone button */}
      <button
        onClick={handleDirectCall}
        className="w-14 h-14 rounded-br-lg rounded-tr-lg md:rounded-br-none md:rounded-tr-none md:rounded-bl-lg md:rounded-tl-lg bg-[rgba(0,0,0,0.5)] md:bg-white shadow-lg flex items-center justify-center hover:scale-110 transition">
        <Image
          src={`/icons/call.svg`}
          alt={"call"}
          width={24}
          height={24}
        />
      </button>

      {/* Chat button */}
      <button
        onClick={handleTidioMessage}
        className="w-14 h-14 rounded-br-lg rounded-tr-lg md:rounded-br-none md:rounded-tr-none md:rounded-bl-lg md:rounded-tl-lg bg-[rgba(0,0,0,0.5)] md:bg-white shadow-lg flex items-center justify-center hover:scale-110 transition">
        <Image
          src={`/icons/chat.svg`}
          alt={"chat"}
          width={24}
          height={24}
        />
      </button>

      {/* WhatsApp button */}
      <button
        onClick={handleWhatsAppCall}
        className="w-14 h-14 rounded-br-lg rounded-tr-lg md:rounded-br-none md:rounded-tr-none md:rounded-bl-lg md:rounded-tl-lg bg-[rgba(0,0,0,0.5)] md:bg-white shadow-lg flex items-center justify-center hover:scale-110 transition">
        <Image
          src={`/icons/whatsapp.svg`}
          alt={"whatsapp"}
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}

export default ActionButtons;
