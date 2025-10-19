"use client";
import React, { useState, useEffect, useCallback } from "react";
import ExploreCard from "./ExploreCard";
import Pagination from "./Pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPopularAttractions } from "../../store/slices/popularAttractions";

// Define the component props to accept an optional country slug
interface ExploreCardSectionProps {
  selectedCountrySlug?: string; // Optional prop for filtering by country
}

export default function ExploreCardSection({ selectedCountrySlug }: ExploreCardSectionProps) {
  // We manage the current page in the component's local state
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  // Destructure data and pagination info from the Redux store
  const { data: attractions, pagination, status, error } = useAppSelector((state) => state.popularAttractions);
  /**
   * 1. API Call (useEffect)
   * This effect runs when the component mounts, or when currentPage or selectedCountrySlug changes.
   */
  useEffect(() => {
    // Dispatch the thunk with the current page and country filter
    dispatch(
      fetchPopularAttractions({ 
        page: currentPage, 
        country: selectedCountrySlug 
      })
    );
    
    // Note: The dependency array ensures a new fetch happens on page or country change
  }, [dispatch, currentPage, selectedCountrySlug]);


  /**
   * 2. Page Change Handler
   * This function updates the local state, which in turn triggers the useEffect above
   * to fetch the new data.
   */
  const handlePageChange = useCallback((page: number) => {
    // Only update if the page is different and within bounds (optional check)
    if (page !== currentPage) {
      setCurrentPage(page);
      // NOTE: The data fetch is handled by the useEffect watching currentPage
      window.scrollTo(0, 0); // Optional: Scroll to top on page change for better UX
    }
  }, [currentPage]);
  
  // ----------------------------------------------------
  // Render Logic
  // ----------------------------------------------------

  if (status === "loading" && attractions.length === 0) return <p className="text-center py-16">Loading attractions...</p>;
  if (status === "failed") return <p className="text-center py-16 text-red-500">Error fetching data: {error}</p>;
  if (attractions.length === 0 && status === "succeeded") return <p className="text-center py-16">No attractions found for this selection.</p>;

  // Use the pagination data from the Redux store
  const totalPages = pagination?.total_pages || 1;
  const currentTotalItems = attractions.length; // Items on the current page

  return (
    <section className='py-16'>
      <div className="container mx-auto px-4">
        
        {/* --- Desktop View (Grid) --- */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-6">
            {/* The component now maps over the attractions array from the Redux store (which is the single page data) */}
            {attractions.map((card) => (
              <ExploreCard
                key={card.id}
                id={card.id}
                // Assuming 'heading' from the store corresponds to 'name' in the component
                name={card.heading} 
                description={card.description}
                image={card.image}
              />
            ))}
          </div>
          
          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="mt-12 hidden md:block">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
        
        {/* --- Mobile View (Swiper) --- */}
        <div className="block md:hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            // Pagination is usually not needed when data is paginated by the API,
            // as you only have the current page's data. If you need navigation,
            // you might want to consider fetching all pages or using infinite scroll.
            // For now, we'll keep the current page's data in the swiper.
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {attractions.map((card, index) => (
              <SwiperSlide
                key={index}
                className=" rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <ExploreCard
                  key={card.id}
                  id={card.id}
                  name={card.heading}
                  description={card.description}
                  image={card.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
