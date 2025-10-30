"use client";

import FeaturedHolidaysDetails from "@/components/FeaturedHolidaysDetails";
import Hero from "@/components/Hero";
import MoreDetails from "@/components/MoreDetails";
import AttractionsSection from "@/components/PopularAttractionSection";
import TestimonialSection from "@/components/TestimonialSection";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchFeaturedHolidaysDetails } from "../../../store/slices/featuredHolidaysDetails";

interface ItinerariesWrapperProps {
  country: string;
  category_slug?: string;
}

export default function ItinerariesWrapper({
  country,
  category_slug,
}: ItinerariesWrapperProps) {
  // const dispatch = useAppDispatch();
  //   const { data, status, error, featuredCategories } = useAppSelector((state) => state.featuresHolidaysDetails);
  //   console.log(data);
  //   console.log("-0-0--");

  //   useEffect(() => {
  //     dispatch(fetchFeaturedHolidaysDetails({
  //       country,
  //       category_slug
  //     }));
  //   }, [dispatch, country, category_slug]);

  return (
    <>
      <Hero
        image={`/banners/image2.png`}
        titleDesktop={`Explore ${country} Your Way`}
        titleMobile={`Explore ${country} Your Way`}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full text-center">
              <h2 className="font-medium text-3xl mb-12">
                Journey through Sri Lanka’s living tapestry
              </h2>
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
              <iframe
                className="w-full rounded-2xl aspect-video"
                src="https://www.youtube.com/embed/sChXehSYd4k?autoplay=1&mute=1&loop=1&playlist=sChXehSYd4k"
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
      <FeaturedHolidaysDetails
        category_slug={category_slug}
        country={country}
      />
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
      <AttractionsSection country={"sri-lanka"} />
    </>
  );
}
