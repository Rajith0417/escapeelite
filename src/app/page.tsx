"use client";
import Attractions from "@/components/Attraction";
import Destination from "@/components/Destination";
import FeaturedAccommodationSection from "@/components/FeaturedAccommodationSection";
import FeaturedHolidaysSection from "@/components/FeaturedHolidaysSection";
import FeaturedHolidaysDetails from "@/components/FeaturedHolidaysDetails";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import MoreDetails from "@/components/MoreDetails";
import TestimonialSection from "@/components/TestimonialSection";

export default function HomePage() {
  return (
    <>
      <Hero/>
      <InfoSection/>
      <FeaturedHolidaysSection/>
      <TestimonialSection/>
      <MoreDetails/>
      <Attractions/>
      <Destination/>
      <FeaturedHolidaysDetails/>
      <FeaturedAccommodationSection />
    </>
  );
}
