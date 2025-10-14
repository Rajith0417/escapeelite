"use client";

import React from "react";
import Image from "next/image";
import Quote from "@/components/Quote";
import FeaturedHolidaysSection from "@/components/FeaturedHolidaysSection";
import InfoSection from "@/components/InfoSection";
// import ChatbotLanding from "@/components/ChatbotLanding";
import ChatbotWrapper from "@/components/chatbot/ChatbotWrapper";
import ChatbotWrapperLanding from "@/components/ChatbotWrapperLanding";
import TestimonialSection from "@/components/TestimonialSection";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SriLankaPage() {
  return (
    <>
      <section
        id="home"
        className="relative h-screen md:h-[900px]"
      >
        <Image
          src={`${basePath}/banners/image13.png`}
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute z-0 inset-0 bg-black opacity-50"></div>
        <div className="container h-full w-full px-5 md:px-0 pt-[120px] md:pt-[150px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start text-white text-center]">
          <div className="z-10 w-full md:w-1/2 md:flex md:flex-col md:gap-8">
            <h2 className="font-medium text-xl md:text-3xl line-clamp-2 text-center md:text-left mb-5">
              Luxury Holidays to Sri Lanka
              & the Maldives Best
              Price Guaranteed!
            </h2>
            <div className="min-h-[200px] mb-5 md:mb-0">
              <video
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
                // autoPlay
                loop
                muted
                className="rounded-2xl"
              />
            </div>
            {/* <TestimonialSection/> */}
            <div className="w-full">
              <TestimonialSection />
            </div>
          </div>
          <div className="z-10 md:w-1/2 md:block pl-16 h-full overflow-scroll" id="landing">
            {/* <ChatbotLanding chatbotId={"f9abbd99-4a16-4ff1-953b-b80bed2f8b28"} open={true}/> */}
            <ChatbotWrapperLanding chatbotId={"f9abbd99-4a16-4ff1-953b-b80bed2f8b28"} />
          </div>

          {/* <div className={`fixed bottom-6 md:bottom-6 right-6 md:right-6 left-6 md:left-1/2 z-60`}>
            <ChatbotMain chatbotId={'f9abbd99-4a16-4ff1-953b-b80bed2f8b28'} open={false} />
          </div> */}
        </div>
      </section>
      <InfoSection />
      <FeaturedHolidaysSection />
    </>
  );
}
