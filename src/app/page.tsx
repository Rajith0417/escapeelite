"use client";
import PopularAttractionsSection from "@/components/PopularAttractionSection";
import FeaturedHolidaysSection from "@/components/FeaturedHolidaysSection";
import FeaturedHolidaysDetails from "@/components/FeaturedHolidaysDetails";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import MoreDetails from "@/components/MoreDetails";
import TestimonialSection from "@/components/TestimonialSection";
import ItinerarySection from "@/components/ItinerarySection";
import ImageGallery from "@/components/ImageGallery";
// import ChatbotPage from "@/components/ChatbotPage";
// import Chatbot from "@/components/Chatbot";

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
      <FeaturedHolidaysDetails
        heading="Featured holidays to MALDIVES"
        dropdownOptions={["All Holidays", "Honeymoon", "Family", "Luxury"]}
        selectedOption="All Holidays"
        onDropdownChange={(val) => console.log(val)}
      />
      <section>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              <ImageGallery />
            </div>
            <div>
              {/* <Chatbot /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
