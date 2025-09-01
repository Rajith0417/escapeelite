"use client";

import React from 'react'
// import { Phone, MessageCircle, Watch } from "lucide-react";
import Image from "next/image";

function ActionButtons() {
  return (
    <div
      className="
        fixed 
        bottom-20 
        left-4 
        top-1/2
        -translate-y-1/2
        md:right-0 md:left-auto
        flex flex-col gap-4
        z-50
      "
    >
      {/* Phone button */}
      <button className="w-14 h-14 rounded-bl-lg rounded-tl-lg bg-white shadow-lg flex items-center justify-center hover:scale-110 transition">
        <Image src={'icons/call.svg'} alt={'call'} width={24} height={24}/>
      </button>

      {/* Chat button */}
      <button className="w-14 h-14 rounded-bl-lg rounded-tl-lg bg-white shadow-lg flex items-center justify-center hover:scale-110 transition">
        <Image src={'icons/chat.svg'} alt={'chat'} width={24} height={24}/>
      </button>

      {/* WhatsApp button */}
      <button className="w-14 h-14 rounded-bl-lg rounded-tl-lg bg-white shadow-lg flex items-center justify-center hover:scale-110 transition">
        <Image src={'icons/whatsapp.svg'} alt={'whatsapp'} width={24} height={24}/>
      </button>
    </div>
  )
}

export default ActionButtons
