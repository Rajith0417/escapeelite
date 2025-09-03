"use client"

import React from "react";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const steps = [
  {
    icon: "/icons/laptop.svg",
    title: "Global Itineraries at Your Fingertips",
    desc: "Explore tailor-made holiday plans to Sri Lanka, India, Maldives, Seychelles, Mauritius, and beyond – all in one place.",
  },
  {
    icon: "/icons/telephone.svg",
    title: "Talk Travel with an Expert",
    desc: "Call us on +44 20 3892 1812 to start planning your dream escape with one of our destination specialists.",
  },
  {
    icon: "/icons/doc.svg",
    title: "Your Dream Trip Starts Here",
    desc: "Discover curated holiday itineraries across Sri Lanka, India, Maldives, Seychelles, Mauritius, and more – right on our website.",
  },
];

export default function BookingSteps() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-5xl font-medium mb-24 text-gray-800">
        Booking Your Travel With Us Is Easy
      </h2>
      <div className="grid md:grid-cols-3 gap-8 container mx-auto px-5 md:px-0">
        {steps.map((s, index) => (
          <div key={index} className="border-solid border border-[#ECECEC] rounded-xl p-6 flex flex-col items-center bg-[#EFF7FF]">
            <Image
              src={`${basePath}{s.icon}`}
              alt={s.title}
              width={80}
              height={80}
              className="mb-8"
            />
            <h4 className="font-semibold text-gray-900">{s.title}</h4>
            <p className="font-normal text-gray-800 mt-3">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
