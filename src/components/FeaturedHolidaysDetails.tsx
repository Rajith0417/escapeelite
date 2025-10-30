"use client";
import React, { useState, useEffect, useMemo } from "react"; // Added useMemo for efficiency
import HolidayCardDetails from "./HolidayCardDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Removed unused Pagination module import
import "swiper/css";
import "swiper/css/navigation";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchFeaturedHolidaysDetails } from "../../store/slices/featuredHolidaysDetails";
import FeaturedHolidaysSection from "./FeaturedHolidaysSection";

// Define the interface for a category item based on your API response
interface PackageCategory {
    id: number;
    pkg_category_name: string;
    pkg_category_slug: string;
}

export interface FeaturedHolidaysDetails {
  id: number;
  package_slug: string;
  package_name: string;
  package_description: string;
  price_starting_from: number;
  package_category_id: number;
  package_order: number;
  pkg_category_slug: string;
  no_of_nights: number;
  no_of_days: number;
  image: string;
  attractions: string[];
  best_times: string;
}
interface PackageCategory {
  id: number;
  pkg_category_name: string;
  pkg_category_slug: string;
}

// Update component props - we no longer need dropdownOptions as props
type FeaturedHolidaysDetailsProps = {
  category_slug?: string;
  country: string;
};

export default function FeaturedHolidaysDetails({country, category_slug}: FeaturedHolidaysDetailsProps) {

  // const dispatch = useAppDispatch();
  // const { data, status, error, featuredCategories } = useAppSelector((state) => state.featuresHolidaysDetails);
  
  // // State to manage the selected category slug (e.g., '4-star-holidays')
  // // Initialize with 'all' or a sensible default that represents "All Holidays"
  const [selectedSlug, setSelectedSlug] = useState<string>('all'); 

const dispatch = useAppDispatch();
      const { data, status, error, featuredCategories } = useAppSelector((state) => state.featuresHolidaysDetails);
      console.log(data);
      console.log("-0-0--");
      
      useEffect(() => {
        dispatch(fetchFeaturedHolidaysDetails({
          country, 
          category_slug
        }));
      }, [dispatch, country, category_slug]);
  
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
    if (selectedSlug === 'all' || !data || !Array.isArray(data)) {
      return data || [];
    }
    // Filter packages by the selected category slug
    return data.filter(pkg => pkg.pkg_category_slug === selectedSlug);
  }, [data, selectedSlug]);

  // -------------------------
  // LOADING / ERROR STATES
  // -------------------------

  if (status === "loading") return <p className="text-center py-16">Loading featured holidays...</p>;
  if (status === "failed") return <p className="text-center py-16 text-red-500">Error: {status}</p>;

  // -------------------------
  // RENDER
  // -------------------------

  return (
    <section className="py-16">
      <div className="container mx-auto px-5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-3xl text-center md:text-left font-medium text-gray-900">
            {data && data.packages[0].package_name}
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
        
        {data && data.packages.length === 0 && status === "succeeded" && (
            <p className="text-center text-gray-600">No holidays found for this category.</p>
        )}

        {data && data.packages.length > 0 && (
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
            {data.packages.map((fhd, index) => (
              <SwiperSlide key={fhd.id} className="!h-auto"> 
                <div className="h-full">
                  <HolidayCardDetails
                    imageSrc={fhd.image}
                    title={fhd.package_name}
                    description={fhd.package_description}
                    duration={fhd.no_of_days}
                    season={fhd.best_times}
                    price={fhd.price_starting_from}
                    onViewMoreHref={`itineraries/${country}/${fhd.pkg_category_slug}/${fhd.package_slug}`} 
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
