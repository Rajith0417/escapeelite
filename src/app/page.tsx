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
      <section>
        <div className="container px-5 mx-auto text-center gap-15 flex items-center flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <video
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            controls
            // autoPlay
            loop
            muted
            className="mx-5 w-[calc(100%-40px)] rounded-2xl"
          />
        </div>
        <div className="w-full md:w-1/2">
        <TestimonialSection/>
        </div>
        </div>
      </section>
      <MoreDetails />
      <PopularAttractionsSection />
    </>
  );
}
