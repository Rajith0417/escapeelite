"use client";
import React from "react";
import Image from "next/image";
export default function Destination() {
  return (
    <section className="relative text-center overflow-hidden pt-16">
      <div className="relative">
<Image
        src={`/banners/image6.jpg`}
        alt=""
        width={0}
        height={0}
        className="absolute w-full h-full object-cover"
      />
      <div className="container py-16 mx-auto px-5 md:px-0">
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        <div className="relative container mx-auto flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 text-white">
            BEST DESTINATION 2025
          </h2>
          <p className="text-white text-md font-normal">
            The roots of Escape Elite Sri Lanka lie in our passion to showcase
            the beauty of miraculous Sri Lanka to the world. Its rich culture,
            exotic sandy beaches, wildlife, rainforests, astonishing hills of
            the midlands and the most hospitable people are our greatest pride.
            We specialize in luxurious holiday escapes for families &amp;
            couples in relaxation, wildlife, culture, religion &amp; adventure
            categories.
          </p>
        </div>
      </div>
      </div>
      
    </section>
  );
}
