"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import PopularAttractionCard from "./PopularAttractionCard";
import "swiper/css/navigation";
import "swiper/css/pagination"; // Import pagination CSS for the dots

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPopularAttractions } from "../../store/slices/popularAttractions";

type AttractionProps = {
  country?: string; // Optional country slug passed as a prop
};

export default function AttractionsSection({ country }: AttractionProps) {

  const dispatch = useAppDispatch();
  // Destructure data, status, and error from the Redux store
  const { data: data, status, error } = useAppSelector((state) => state.popularAttractions);
  
  // Define the default page to fetch for this carousel section
  const PAGE_TO_FETCH = 1; 

  useEffect(() => {
    // Dispatch the thunk with an object containing the country and page
    // The country is optional (default undefined if not passed), and the page is fixed at 1
    dispatch(
      fetchPopularAttractions({ 
        country: country, 
        page: PAGE_TO_FETCH // Always fetch the first page for the carousel
      })
    );
    
    // The fetch is triggered whenever the component mounts or the country prop changes.
  }, [dispatch, country]); // Removed the old `data` dependency which could cause infinite loops

  if (status === "loading") return <p className="text-center py-8">Loading popular attractions...</p>;
  if (status === "failed") return <p className="text-center py-8 text-red-500">Error: {error}</p>;
  if (data.length === 0) return null; // Or a message indicating no attractions found

  return (
    <section id="attractions" className="py-16">
      <div className="container text-center mx-auto px-5 md:px-0">
        <h3 className="text-3xl font-medium mb-12 text-gray-800">Popular Attractions</h3>
        <div className="width-full">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true} // Note: Be cautious with `loop: true` if you only load one page of data.
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 1, // ✅ mobile
              },
              640: {
                slidesPerView: 2, // ✅ tablet
              },
              1024: {
                slidesPerView: 3, // ✅ desktop
              },
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {/* Map over the attractions array from the Redux store */}
            {Array.isArray(data) && data.map((attraction, index) => (
              <SwiperSlide
                // Using attraction.id as key is safer than index if data is stable
                key={attraction.id} 
                className=" rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <PopularAttractionCard
                  id={attraction.id}
                  img={attraction.image}
                  title={attraction.heading} // Assumed 'heading' maps to 'title'
                  // If your API doesn't return a 'url', you'll need to compute it here or in the card component.
                  // For now, I'll remove it or assume it's part of the Attraction interface.
                  // link={attraction.url} 
                  paragraph={attraction.description}
                  country={attraction.country}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
