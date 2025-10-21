"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import AdvancedSearchFilters from "./AdvancedSearchFilters";
import AccommodationGrid from "./AccommodationGrid";
import Pagination from "./Pagination";

import { useAppDispatch, useAppSelector } from "../../store/hooks"; // ⬅️ IMPORT RootState
import { fetchAccommodations } from "../../store/slices/accommodations";

// --- Interfaces for Component Props (Simplified) ---
interface AccommodationGridItem {
  id: number
  name: string
  slug: string
  description_preview: string
  star_rating: number
  category_name: string
  category_slug: string
  country_slug: string
  image_url: string
  detail_url: string
}
interface country {
  name: string,
  slug: string,
}

interface location {
  id: number,
  name: string
}

interface type {
  name: string,
  slug: string
}

interface filter_options {
  countries: country[],
  locations: location[],
  types: type[],
  ratings: []
}

interface AccommodationData {
  data: AccommodationGridItem[],
  filter_options: filter_options
}

// Interface for API parameters
interface FilterApiValues {
  country: string; // maps to API 'country' slug
  city: string;    // maps to API 'city' ID (location)
  acc: string;     // maps to API 'acc' (accommodation type slug)
  star: string;    // maps to API 'star' rating
}


export default function FeaturedAccommodationSection() {

  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.accommodations);
  
  // 1. State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9; // Set your desired items per page

  // 2. Initial Data Fetch (Runs once on mount)
  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  // 3. Pagination Logic using useMemo for efficiency
  const allAccommodations = data?.data || [];
  const totalItems = allAccommodations.length;
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / ITEMS_PER_PAGE);
  }, [totalItems]);

  // Determine the subset of data for the current page
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allAccommodations.slice(startIndex, endIndex);
  }, [allAccommodations, currentPage]);

  const currentItemsCount = currentItems.length;

  // 4. Page Change Handler
  const handlePageChange = useCallback((page: number) => {
    // Ensure the page number is valid
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        // Optional: Scroll to the top of the grid when changing pages
        const gridElement = document.getElementById('accommodation-grid');
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
  }, [totalPages]);
  
  // Reset page to 1 if the filter results change (or totalItems changes)
  // This is crucial if you later add the AdvancedSearchFilters back.
  useEffect(() => {
      setCurrentPage(1);
  }, [totalItems]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // console.log(data); // Kept for debugging if needed

  return (
    <>
      <section className="bg-gray-800 relative md:h-0 md:mb-24">
        {/* Advanced Search Filters */}
        <div className="z-10 bg-white md:w-3/4 md:absolute md:rounded-md md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
          {/* Pass filter options and current values down */}
          {data &&<AdvancedSearchFilters
            // onSearch={handleSearch}
            // onFilterChange={handleFilterChange}
            // // Passing the current filter values to keep the dropdowns synced
            // initialFilters={filters}
            // // Passing the dynamic options fetched from the API
            filterOptions={data.filter_options} // Use a more specific type if available
          />}
        </div>
      </section>
      
      {/* --- */}

      {/* Featured Accommodation Section */}
      <section id="resorts" className="py-16">
        <div className="container mx-auto px-5">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              Featured Accommodation
            </h2>
          </div>

          {/* Results count (FIXED) */}
          {/* <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-bold">{currentItemsCount}</span> accommodations on this page. Total found: <span className="font-bold">{totalItems}</span>
            </p>
          </div> */}

          {/* Accommodation Grid (FIXED: Using currentItems) */}
          <div id="accommodation-grid"> {/* Added ID for optional smooth scroll */}
            {currentItems.length > 0 ? (
              <AccommodationGrid accommodations={currentItems} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No accommodations found matching your criteria.
                </p>
              </div>
            )}
          </div>

          {/* Pagination (FIXED: Un-hidden and populated props) */}
          {totalPages > 1 && (
            <div className="mt-12"> {/* Removed 'hidden md:block' if you want it on all sizes */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
