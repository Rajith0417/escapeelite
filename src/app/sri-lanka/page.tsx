"use client";

import Chatbot from "@/components/Chatbot";
import FeaturedHolidaysDetails from "@/components/FeaturedHolidaysDetails";
import Hero from "@/components/Hero";
import MoreDetails from "@/components/MoreDetails";
import AttractionsSection from "@/components/PopularAttractionSection";
import TestimonialSection from "@/components/TestimonialSection";
import React from "react";

export default function SriLankaPage() {
  return (
    <>
      <Hero
        image={`/banners/image13.png`}
        titleDesktop="Explore Sri Lanka Your Way"
        titleMobile="Explore Sri Lanka Your Way"
      />
      <section className='py-16'>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full text-center">
              <h2 className="font-medium text-3xl mb-12">Journey through Sri Lanka’s living tapestry</h2>
              <p className="font-normal text-md">
                You can now start planning your holiday to Sri Lanka with our
                experienced care. We specialise in family holidays, nature and
                wildlife holidays, honeymoon holidays, cultural holidays,
                retirement holidays, weddings in Sri Lanka, cricket tours &
                adventurous holidays. You can also speak to a friendly travel
                manager to get a holiday crafted to your requirements. Our
                promise is to offer the best price. We pride in excellent
                reviews we get.
              </p>
            </div>
            <div>
              <video
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
                // autoPlay
                loop
                muted
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      <FeaturedHolidaysDetails
        heading="Featured holidays to Sri Lanka"
        country="sri-lanka"
      />
      <section>
        <div className="container pt-16 px-5 mx-auto text-center gap-8 flex items-center flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <video
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              controls
              // autoPlay
              loop
              muted
              className="w-full rounded-2xl"
            />
          </div>
          <div className="w-full md:w-1/2">
            <TestimonialSection />
          </div>
        </div>
      </section>
      <MoreDetails />
      <AttractionsSection country={"sri-lanka"} />
    </>
  );
}
