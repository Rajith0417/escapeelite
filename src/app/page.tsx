"use client";
import PopularAttractionsSection from "@/components/PopularAttractionSection";
import FeaturedHolidaysSection from "@/components/FeaturedHolidaysSection";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import MoreDetails from "@/components/MoreDetails";
import TestimonialSection from "@/components/TestimonialSection";

export default function HomePage() {
  return (
    <>
      <Hero
        image="/banners/image9.png"
        titleDesktop="We Specialize in Sri Lanka & the Maldives – Get Your Free Custom
            Itinerary!"
        titleMobile="Welcome to Escape Elite!"
      />
      <InfoSection />
      <FeaturedHolidaysSection />
      <TestimonialSection />
      <MoreDetails />
      <PopularAttractionsSection />
    </>
  );
}
