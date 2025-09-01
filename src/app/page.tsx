"use client";
import Attractions from "@/components/Attraction";
import FeaturedAccommodationSection from "@/components/FeaturedAccommodationSection";
import FeaturedHolidaysSection from "@/components/FeaturedHolidaysSection";
import FeaturedHolidaysDetails from "@/components/FeaturedHolidaysDetails";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import MoreDetails from "@/components/MoreDetails";
import TestimonialSection from "@/components/TestimonialSection";
import ItinerarySection from "@/components/ItinerarySection";
import ImageLeftRightSection from "@/components/ImageLeftRightSection";
import ImageGallery from "@/components/ImageGallery";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InfoSection />
      <FeaturedHolidaysSection/>
      <TestimonialSection/>
      <MoreDetails/>
      <Attractions/>
      <FeaturedHolidaysDetails
        heading="Featured holidays to MALDIVES"
        dropdownOptions={["All Holidays", "Honeymoon", "Family", "Luxury"]}
        selectedOption="All Holidays"
        onDropdownChange={(val) => console.log(val)}
      />
      <FeaturedAccommodationSection />
      <ItinerarySection/>
      <section>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              <ImageGallery />
            </div>
            <div>

            </div>
          </div>
        </div>
      </section>
      <ImageLeftRightSection />
    </>
  );
}
