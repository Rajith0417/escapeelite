"use client";
import AttractionsSection from "@/components/AttractionSection";
import FeaturedHolidaysSection from "@/components/FeaturedHolidaysSection";
import FeaturedHolidaysDetails from "@/components/FeaturedHolidaysDetails";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import MoreDetails from "@/components/MoreDetails";
import TestimonialSection from "@/components/TestimonialSection";
import ItinerarySection from "@/components/ItinerarySection";
import ImageLeftRightSection from "@/components/ImageLeftRightSection";
import ImageGallery from "@/components/ImageGallery";
// import ChatbotPage from "@/components/ChatbotPage";

export default function HomePage() {
  return (
    <>
      <Hero
        image="banners/image9.png"
        titleDesktop="We Specialize in Sri Lanka & the Maldives – Get Your Free Custom
            Itinerary!"
        titleMobile="Welcome to Escape Elite!"
      />
      <InfoSection />
      <FeaturedHolidaysSection />
      <TestimonialSection />
      <MoreDetails />
      <AttractionsSection />
      <FeaturedHolidaysDetails
        heading="Featured holidays to MALDIVES"
        dropdownOptions={["All Holidays", "Honeymoon", "Family", "Luxury"]}
        selectedOption="All Holidays"
        onDropdownChange={(val) => console.log(val)}
      />
      <ItinerarySection />
      <section>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              <ImageGallery />
            </div>
            <div>
              {/* <ChatbotPage questionnaireId="b91db0d7-e9b2-4432-bc19-0c90f894f407" /> */}
            </div>
          </div>
        </div>
      </section>
      <ImageLeftRightSection />
    </>
  );
}
