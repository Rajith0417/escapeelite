"use client";

import React from "react";
import Image from "next/image";
import Quote from "@/components/Quote";
import FeaturedHolidaysSection from "@/components/FeaturedHolidaysSection";
import InfoSection from "@/components/InfoSection";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SriLankaPage() {
  return (
    <>
      <section
        id="home"
        className="relative h-screen md:h-[1100px]"
      >
        <Image
          src={`${basePath}/banners/image13.png`}
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute z-0 inset-0 bg-black opacity-50"></div>
        <div className="container h-full w-full px-5 mx-auto flex flex-col md:flex-row items-center justify-center md:justify-start text-white text-center]">
          <div className="z-10 w-full md:w-1/2 md:flex md:flex-col md:gap-8">
            <h2 className="font-medium text-5xl">
              Luxury Holidays to Sri Lanka
              & the Maldives Best
              Price Guaranteed!
            </h2>
            <div className="h-[280px]">
              <video
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
                autoPlay
                loop
                muted
                className="mx-5 rounded-2xl"
              />
            </div>
            <Quote />
          </div>
          <div className="z-10 md:w-1/2 md:block pl-16">
            
          </div>
        </div>
      </section>
      <InfoSection/>
      <FeaturedHolidaysSection/>
    </>
  );
}
