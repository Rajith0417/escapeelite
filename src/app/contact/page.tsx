'use client'
// import ChatbotPage from "@/components/ChatbotPage";
import Hero from "@/components/Hero";
import React from "react";
import Image from "next/image";
import TestimonialSection from "@/components/TestimonialSection";
// import Chatbot from "@/components/Chatbot";
import ChatbotWrapper from "@/components/chatbot/ChatbotWrapper";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Contact() {
  return (
    <>
      <Hero
        image="/banners/image11.png"
        titleDesktop="get in touch with us"
        titleMobile="get in touch with us"
        paragraph="Chat with our AI assistant to get instant help with your travel planning, or connect directly with our travel experts for personalized service."
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              {/* <Chatbot chatbotId={"58257f11-ec99-4301-a358-35fddcc6cf15"} /> */}
              <ChatbotWrapper chatbotId="58257f11-ec99-4301-a358-35fddcc6cf15"/>
            </div>
            <div className="w-full flex flex-col gap-12">
              <div className="flex items-start gap-5">
                <Image src={`${basePath}/icons/map.svg`} alt={""} width={24} height={24}/>
                <div>
                  <h3 className="text-2xl font-normal text-gray-900">
                    Location
                  </h3>
                  <p className="mt-1 text-base font-normal leading-relaxed">
                    VA Travel Tech
                    <br />
                    5 Mackenzie Court
                    <br />
                    Madeira Walk, Ascot,
                    <br />
                    Berkshire, SL5 OGR,
                    <br />
                    United Kingdom
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <Image src={`${basePath}/icons/send.svg`} alt={""} width={24} height={24}/>
                <div>
                  <h3 className="text-2xl font-normal text-gray-900">Email</h3>
                  <p className="mt-1 text-base font-normal">
                    <a
                      href="mailto:admin@escapeelite.com"
                      className="hover:underline"
                    >
                      admin@escapeelite.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <Image src={`${basePath}/icons/call.svg`} alt={""} width={24} height={24}/>
                <div>
                  <h3 className="text-xl font-normal text-gray-900">Phone</h3>
                  <p className="mt-1 text-base font-normal">
                    <a href="tel:+442038921812" className="hover:underline">
                      +44 20 3892 1812
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialSection/>
    </>
  );
}
