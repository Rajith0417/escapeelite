 "use client"
 import React from "react";
import Image from "next/image";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface HolidayCardProps {
  img: string;
  title: string;
  location: string;
}

function HolidayCard({img, title, location}: HolidayCardProps) {
  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden">
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-gradient-to-b from-transparent via-black/30 to-black"></div>
      <Image
        src={`${basePath}${img}`}
        alt={title}
        fill
        className="object-cover rounded-xl"
      />
      <div className="absolute bottom-5 left-0 right-0 z-20 text-center text-white">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <p className="text-lg font-semibold">{title}</p>
          <Link href="#" className="hover:scale-110 transition-transform">
            <Image
              src={`${basePath}/icons/arrowBlue.svg`}
              alt="View details"
              width={20}
              height={20}
              className="filter invert"
            />
          </Link>
        </div>
        <p className="text-sm text-gray-200">{location}</p>
      </div>
    </div>
  );
}

export default HolidayCard;
