"use client";
import { useState } from "react";

export interface TabItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface ItineraryInnerTabsProps {
  tabs: TabItem[];
  initialTabId?: string;
}

export default function ItineraryInnerTabs({ tabs, initialTabId }: ItineraryInnerTabsProps) {
  const [active, setActive] = useState<string>(initialTabId || tabs[1]?.id);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-around gap-0 p-2.5 mb-4 border-solid border-b border-b-[#ECECEC]">
        {tabs.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-5 py-2.5 md:px-6 md:py-2 lg:px-2 text-sm rounded-2xl transition-colors ${
                isActive ? "bg-[#F3F4F6] text-gray-900" : "text-gray-900 hover:text-gray-900"
              }`}
            >
              {t.title}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {tabs.map((t) => (
          <div key={t.id} className={t.id === active ? "block" : "hidden"}>
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}

