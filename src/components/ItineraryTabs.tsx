"use client";
import { useState } from "react";

export interface TabItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface ItineraryTabsProps {
  tabs: TabItem[];
  initialTabId?: string;
}

export default function ItineraryTabs({ tabs, initialTabId }: ItineraryTabsProps) {
  const [active, setActive] = useState<string>(initialTabId || tabs[0]?.id);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-center gap-4 rounded-full border border-gray-200 bg-white p-1 mb-6">
        {tabs.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-6 py-2 text-sm rounded-full transition-colors ${
                isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"
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
