"use client";
import Attractions from "@/components/Attraction";
import Destination from "@/components/Destination";
import FeaturedHolidays from "@/components/FeaturedHolidays";
import FeaturedHolidaysDetails from "@/components/FeaturedHolidaysDetails";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import MoreDetails from "@/components/MoreDetails";
import Testimonial from "@/components/Testimonial";

export default function HomePage() {
  return (
    <>
      <Hero/>
      <InfoSection/>
      <FeaturedHolidays/>
      <Testimonial/>
      <MoreDetails/>
      <Attractions/>
      <Destination/>
      <FeaturedHolidaysDetails/>
    </>
  );
}
