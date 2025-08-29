"use client";
import Image from "next/image";
import ItineraryInnerTabs, { TabItem } from "./ItineraryInnerTabs";

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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block whitespace-nowrap rounded-full bg-[#EFF7FF] font-medium px-3 py-1 text-xs text-black">
      {children}
    </span>
  );
}

export default function ItineraryDayCard({
  dayNumber,
  city,
  imageSrc,
  attractions,
  accommodation,
  transportation,
}: ItineraryDayCardProps) {


  const innerTabsItems: TabItem[] = (["Superior", "Deluxe", "Luxury"] as const).map(
  (tier) => ({
    id: tier,              // unique id for the tab
    title: tier,           // tab label (Superior, Deluxe, Luxury)
    content: (
      <div className="py-4 flex flex-col items-start md:items-center gap-2">
        {accommodation[tier].map((name, idx) => (
          <Pill key={idx}>{name}</Pill>
        ))}
      </div>
    ),
  })
);


  return (
    <article className="rounded-xl ring-1 ring-gray-200 bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 px-5 py-8">
        {/* Left image */}
        <div className="relative aspect-[4/3] md:aspect-auto md:h-[200px] rounded-lg overflow-hidden">
          <Image
            src={imageSrc}
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

          <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
            {/* Attractions */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">
                Attractions
              </h4>
              <div className="flex flex-wrap gap-2">
                {attractions.map((a, i) => (
                  <Pill key={i}>{a}</Pill>
                ))}
              </div>
            </div>

            {/* Accommodation */}
            <div className="lg:col-span-4">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">
                Accommodation
              </h4>
              <div className="hidden lg:col-span-2 md:grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["Superior", "Deluxe", "Luxury"] as const).map((tier) => (
                  <div
                    key={tier}
                    className="rounded-lg ring-1 ring-gray-200 p-3"
                  >
                    <div className="text-center text-[14px] font-medium text-blue-400 mb-2">
                      {tier}
                    </div>
                    <div className="flex flex-col items-start md:items-center gap-2">
                      {accommodation[tier].map((name, idx) => (
                        <Pill key={idx}>{name}</Pill>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="block md:hidden">
                <ItineraryInnerTabs tabs={innerTabsItems} />
              </div>
            </div>

            {/* Transportation */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">
                Transportation
              </h4>
              <div className="space-y-3 flex flex-col rounded-lg ring-1 ring-gray-200">
                {transportation.map((t, i) => (
                  <div
                    key={i}
                    className=" p-3 flex items-start gap-3 m-0"
                  >
                    <div className="shrink-0 mt-0.5 w-12 h-12 flex justify-center items-center bg-[#EFF7FF] rounded-full">
                      <Image
                        src={`icons/${t.icon}.svg`}
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
    </article>
  );
}
