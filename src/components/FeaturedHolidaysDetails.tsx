"use client";
import React, { useState, useEffect, useMemo } from "react"; // Added useMemo for efficiency
import HolidayCardDetails from "./HolidayCardDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Removed unused Pagination module import
import "swiper/css";
import "swiper/css/navigation";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchFeaturedHolidaysDetails } from "../../store/slices/featuredHolidaysDetails";

// Define the interface for a category item based on your API response
interface PackageCategory {
    id: number;
    pkg_category_name: string;
    pkg_category_slug: string;
}

// Update component props - we no longer need dropdownOptions as props
type FeaturedHolidaysDetailsProps = {
  heading?: string;
  country: string; // Made country mandatory for data fetching
};

export default function FeaturedHolidaysDetails({
  heading = "Featured Holidays", // Default heading is fine
  country, // The country for fetching data
}: FeaturedHolidaysDetailsProps) {

  const dispatch = useAppDispatch();
  const { data, status, error, featuredCategories } = useAppSelector((state) => state.featuresHolidaysDetails);
  
  // State to manage the selected category slug (e.g., '4-star-holidays')
  // Initialize with 'all' or a sensible default that represents "All Holidays"
  const [selectedSlug, setSelectedSlug] = useState<string>('all'); 

  // Determine the display name for the heading
  const countryName = useMemo(() => 
    data?.country_data?.country_name || country.toUpperCase(), 
  [data?.country_data?.country_name, country]);

  // The main fetch effect. This will run on mount and when the country changes.
  useEffect(() => {
    // Note: The thunk might need modification if it currently only accepts 'country'.
    // Assuming you update the thunk to accept an object or just the country slug.
    dispatch(fetchFeaturedHolidaysDetails(country));
  }, [dispatch, country]);
  
  
  // Create the full list of dropdown options, starting with "All Holidays"
  const dropdownOptions = useMemo(() => {
    const options = [{ pkg_category_name: "All Holidays", pkg_category_slug: "all" } as PackageCategory];
    if (Array.isArray(featuredCategories)) {
      return options.concat(featuredCategories);
    }
    return options;
  }, [featuredCategories]);

  // Filter the data based on the selected category slug
  const filteredData = useMemo(() => {
    // If 'all' is selected, or if data is not an array, return all packages
    if (selectedSlug === 'all' || !data?.packages || !Array.isArray(data.packages)) {
      return data?.packages || [];
    }
    // Filter packages by the selected category slug
    return data.packages.filter(pkg => pkg.pkg_category_slug === selectedSlug);
  }, [data?.packages, selectedSlug]);

  // -------------------------
  // LOADING / ERROR STATES
  // -------------------------

  if (status === "loading") return <p className="text-center py-16">Loading featured holidays...</p>;
  if (status === "failed") return <p className="text-center py-16 text-red-500">Error: {error}</p>;

  // -------------------------
  // RENDER
  // -------------------------

  return (
    <section className="py-16">
      <div className="container mx-auto px-5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-3xl text-center md:text-left font-medium text-gray-900">
            {heading.replace('SRI LANKA', countryName)}
          </h2>
          <div className="hidden md:block">
            <select
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none"
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)} // Use local state update
            >
              {dropdownOptions.map((opt) => (
                <option 
                  key={opt.pkg_category_slug} 
                  value={opt.pkg_category_slug}
                >
                  {opt.pkg_category_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {filteredData.length === 0 && status === "succeeded" && (
            <p className="text-center text-gray-600">No holidays found for this category.</p>
        )}

        {/* Swiper carousel */}
        {filteredData.length > 0 && (
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            loop={false} // Change loop to false since filtering is active
            wrapperClass="flex pb-3"
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }}
            modules={[Navigation]}
            className="featured-holidays-swiper123 !p-1"
          >
            {/* Map over the filtered data */}
            {filteredData.map((fhd, index) => (
              <SwiperSlide key={fhd.id} className="!h-auto"> 
                <div className="h-full">
                  <HolidayCardDetails
                    imageSrc={fhd.image}
                    title={fhd.package_name}
                    description={fhd.package_description}
                    duration={fhd.no_of_days}
                    season={fhd.best_times}
                    price={fhd.price_starting_from}
                    onViewMoreHref={`itineraries?country=${country}&category=${fhd.pkg_category_slug}&packageSlug=${fhd.package_slug}`} // Use package_slug for better URLs
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
