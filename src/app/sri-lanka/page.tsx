"use client";

import FeaturedHolidaysDetails from "@/components/FeaturedHolidaysDetails";
import Hero from "@/components/Hero";
import MoreDetails from "@/components/MoreDetails";
import AttractionsSection from "@/components/PopularAttractionSection";
import TestimonialSection from "@/components/TestimonialSection";
import React from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SriLankaPage() {
  return (
    <>
      <Hero
        image={`${basePath}/banners/image13.png`}
        titleDesktop="Explore Sri Lanka Your Way"
        titleMobile="Explore Sri Lanka Your Way"
      />
      <section>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full text-center">
              <h2 className="font-medium text-4xl mb-10">Journey through Sri Lanka’s living tapestry</h2>
              <p className="font-normal text-xl">
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
            <div>{/* <Chatbot /> */}</div>
          </div>
        </div>
      </section>
      <FeaturedHolidaysDetails
        heading="Featured holidays to SL"
        dropdownOptions={["All Holidays", "Honeymoon", "Family", "Luxury"]}
        selectedOption="All Holidays"
        onDropdownChange={(val) => console.log(val)}
      />
      <TestimonialSection/>
      <MoreDetails/>
      <AttractionsSection/>
    </>
  );
}
