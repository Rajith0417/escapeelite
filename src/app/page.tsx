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
        <div className="container pt-16 px-5 mx-auto text-center gap-8 flex items-center flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <iframe
              className="w-full rounded-2xl aspect-video"
              src="https://www.youtube.com/embed/sChXehSYd4k?autoplay=1&mute=1&loop=1&playlist=sChXehSYd4k"
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />

          </div>
          <div className="w-full md:w-1/2">
            <TestimonialSection />
          </div>
        </div>
      </section>
      <MoreDetails />
      <PopularAttractionsSection />
    </>
  );
}
