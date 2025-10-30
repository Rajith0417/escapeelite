"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchItineraries } from "../../../store/slices/itineraries";

import ChatbotWrapper from "@/components/chatbot/ChatbotWrapper";
import Hero from "@/components/Hero";
import ImageGallery from "@/components/ImageGallery";
import ItinerarySection from "@/components/ItinerarySection";

interface ItineraryWrapperProps {
  country: string;
  packageSlug: string;
  category: string;
}

export default function ItineraryWrapper({ country, packageSlug, category }: ItineraryWrapperProps) {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.itineraries);

  useEffect(() => {
    dispatch(fetchItineraries({
      country, 
      category,
      packageSlug
    }));
  }, [dispatch, country, packageSlug, category]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // console.log("-0-0-0-");
  // console.log("Fetched data:", data);

  return (
    <>
      <Hero
        image={`/banners/image2.png`}
        titleDesktop="Nature & Wildlife Tours"
        titleMobile="Nature & Wildlife Tours"
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              <ImageGallery images={data?.images}/>
            </div>
            <div className="w-full">
              <ChatbotWrapper chatbotId="cda93067-397c-404b-8130-c2e68c403508" />
            </div>
          </div>
        </div>
      </section>
      <ItinerarySection itineraries={data?.itinerary} mapData={data?.package_map} />
    </>
  );
}
