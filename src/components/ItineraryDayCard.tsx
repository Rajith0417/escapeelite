"use client";
import Image from "next/image";
import ItineraryInnerTabs, { TabItem } from "./ItineraryInnerTabs";
import Popup from "./Popup";
import Pill from "./Pill";
import { useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface ItineraryDayCardProps {
  dayNumber: number;
  city: string;
  imageSrc: string;
  attractions: string[];
  accommodation: {
    Superior: string[];
    Deluxe: string[];
    Luxury: string[];
  };
  transportation: Array<{
    title: string;
    subtitle?: string;
    note?: string;
    included?: boolean;
    icon?: string;
  }>;
}

// function Pill({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="font-inter inline-block rounded-full bg-[#EFF7FF] font-medium px-3 py-1 text-xs text-black">
//       {children}
//     </span>
//   );
// }

export default function ItineraryDayCard({
  dayNumber,
  city,
  imageSrc,
  attractions,
  accommodation,
  transportation,
}: ItineraryDayCardProps) {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState("");

  const handlePillClick = (accommodationName: string) => {
    console.log("handle pill click "+accommodationName);
    
    setSelectedAccommodation(accommodationName);
    setIsPopupOpen(true);
  };

  const innerTabsItems: TabItem[] = (["Superior", "Deluxe", "Luxury"] as const).map(
  (tier) => ({
    id: tier,              // unique id for the tab
    title: tier,           // tab label (Superior, Deluxe, Luxury)
    content: (
      <>
      <div className="py-4 flex flex-col items-start md:items-center gap-2">
        {accommodation[tier].map((name, idx) => (
          <Pill key={idx} onClick={() => handlePillClick(name)}>{name}</Pill>
        ))}
      </div>
      </>
    ),
  })
);


  return (
    <article className="m-0.5 md:m-0 rounded-xl ring-1 ring-gray-200 bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 px-5 py-8">
        {/* Left image */}
        <div className="relative aspect-[4/3] md:aspect-auto md:h-[200px] rounded-lg overflow-hidden">
          <Image
            src={`${basePath}${imageSrc}`}
            alt={city}
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Right content */}
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-wide px-2 py-1 rounded-md bg-gray-900 text-white">
              DAY {String(dayNumber).padStart(2, "0")}
            </span>
            <h3 className="text-lg md:text-2xl font-semibold text-gray-900">
              {city}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 md:gap-4">
            {/* Attractions */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="text-base lg:text-xs font-semibold text-gray-500 mb-2">
                Attractions
              </h4>
              <div className="flex flex-wrap gap-2 px-5 py-4 rounded-lg xl:ring-1 ring-gray-200 items-start md:items-center text-center">
                {attractions.map((a, i) => (
                  <Pill key={i} onClick={() => handlePillClick(a)}>{a}</Pill>
                ))}
              </div>
            </div>

            {/* Accommodation */}
            <div className="col-span-1 lg:col-span-3 text-center">
              <h4 className="text-base lg:text-xs font-semibold text-gray-500 mb-2">
                Accommodation
              </h4>
              <div className="hidden lg:col-span-2 xl:grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["Superior", "Deluxe", "Luxury"] as const).map((tier) => (
                  <div
                    key={tier}
                    className="rounded-lg ring-1 ring-gray-200 p-2"
                  >
                    <div className="text-center text-[14px] font-medium text-blue-400 mb-2">
                      {tier}
                    </div>
                    <div className="flex flex-col items-start md:items-center gap-2">
                      {accommodation[tier].map((name, idx) => (
                        <>
                        {"090"}
                        <Pill key={idx} onClick={() => handlePillClick(name)}>{name}</Pill>
                        </>
                        
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="block xl:hidden">
                <ItineraryInnerTabs tabs={innerTabsItems} />
              </div>
            </div>

            {/* Transportation */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="text-base lg:text-xs font-semibold text-gray-500 mb-2">
                Transportation
              </h4>
              <div className="space-y-3 flex flex-col rounded-lg xl:ring-1 ring-gray-200">
                {transportation.map((t, i) => (
                  <div
                    key={i}
                    className=" p-3 flex items-start gap-3 m-0"
                  >
                    <div className="shrink-0 mt-0.5 w-12 h-12 flex justify-center items-center bg-[#EFF7FF] rounded-full">
                      <Image
                        src={`${basePath}/icons/${t.icon}.svg`}
                        alt="{t.icon}"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="text-xs text-gray-700">
                      <div className="font-semibold">{t.title}</div>
                      {t.subtitle && (
                        <div className="text-gray-500">{t.subtitle}</div>
                      )}
                      {t.note && (
                        <div className="text-[10px] text-blue-400">
                          {t.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Accommodation Details</h2>
        <p className="text-gray-700">{selectedAccommodation}</p>
      </Popup>
    </article>
  );
}
