import { log } from 'console';
import React from 'react'

interface PillProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function Pill({ children, onClick }: PillProps) {
  console.log("inside pill");
  
  return (
    <span className="font-inter inline-block rounded-full bg-[#EFF7FF] font-medium px-3 py-1 text-xs text-black"
      onClick={onClick}
      >
      {children}
    </span>
  );
}

export default Pill
