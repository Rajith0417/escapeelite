"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import AdvancedSearchFilters from "./AdvancedSearchFilters";
import AccommodationGrid from "./AccommodationGrid";
import Pagination from "./Pagination";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
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

interface city {
  id: number,
  name: string
}

interface type {
  name: string,
  slug: string
}

interface rating {
  id: string;
  name: string;
}

interface filter_options {
  countries: country[],
  cities: city[],
  types: type[],
  ratings: rating[]
}

interface AccommodationData {
  data: AccommodationGridItem[],
  filter_options: filter_options
}

// Interface for Filter State values
interface FilterStateValues {
  name: string;
  country: string; 
  city: string; 
  type: string;     
  rating: string;   
}

// Initial default state for filters
const initialFilterState: FilterStateValues = {
  name: "",
  country: "",
  city: "",
  type: "",
  rating: "",
};


export default function FeaturedAccommodationSection() {

  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.accommodations);
  
  // 1. PENDING FILTERS: Holds the user's latest selections in the dropdowns.
  // This state is passed down to AdvancedSearchFilters as the display value.
  const [pendingFilters, setPendingFilters] = useState<FilterStateValues>(initialFilterState);

  // 2. APPLIED FILTERS: Holds the filters used for the current API call.
  // Only updated when the search button is clicked.
  const [appliedFilters, setAppliedFilters] = useState<FilterStateValues>(initialFilterState);

  // 3. State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // 4. Handle Filter Change (Updates PENDING state only, no API call)
  const handleFilterChange = useCallback((newFilters: FilterStateValues) => {
    // 🛑 This function is now used to update the PENDING state from the dropdowns
    setPendingFilters(newFilters);
    console.log("Pending filters updated:", newFilters);
  }, []);

  // 5. Handle Search Button Click (Updates APPLIED state, triggering useEffect)
  const handleSearchClick = useCallback((newFilters: FilterStateValues) => {
    
    // 1. Update APPLIED filter state -> Triggers the API fetch useEffect below
    setAppliedFilters(newFilters); 
    // 2. Ensure pending filters are in sync for immediate button click scenarios
    setPendingFilters(newFilters);
    console.log("Search button clicked. Applied filters set:", newFilters);
  }, []);

  // 6. Data Fetch (Runs on mount AND when APPLIED filters change)
  useEffect(() => {
    // This runs on mount with initialFilterState and whenever the Search button is clicked.
    dispatch(fetchAccommodations({
      name: appliedFilters.name,
      country: appliedFilters.country,
      city: appliedFilters.city, 
      type: appliedFilters.type,
      rating: appliedFilters.rating,
    }));
    console.log("Fetching accommodations with applied filters:", appliedFilters);
    
  }, [dispatch, appliedFilters]); // ⬅️ DEPENDENCY ARRAY updated to use appliedFilters

  // --- Pagination Logic (uses data) ---
  const allAccommodations = data?.data || [];
  const totalItems = allAccommodations.length;
  
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / ITEMS_PER_PAGE);
  }, [totalItems]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allAccommodations.slice(startIndex, endIndex);
  }, [allAccommodations, currentPage]);

  const currentItemsCount = currentItems.length;

  // 7. Page Change Handler
  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        const gridElement = document.getElementById('accommodation-grid');
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
  }, [totalPages]);
  
  // Reset page to 1 if the filter results change (or totalItems changes)
  useEffect(() => {
      setCurrentPage(1);
  }, [totalItems]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <section className="bg-gray-800 relative md:h-0 md:mb-24">
        {/* Advanced Search Filters */}
        <div className="z-10 bg-white md:w-3/4 md:absolute md:rounded-md md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
          {data && <AdvancedSearchFilters
            // 🛑 FIX 1: Pass the PENDING filters down so dropdowns show the current selection
            initialFilters={pendingFilters}
            
            // 🛑 FIX 2: Pass the handler that updates the PENDING state (on filter selection)
            onFilterChange={handleFilterChange} 
            
            // 🛑 FIX 3: Pass the handler that triggers the API call (on button click)
            onSearchClick={handleSearchClick} 
            
            filterOptions={{
              countries: data.filter_options.countries,
              cities: data.filter_options.cities,
              types: data.filter_options.types,
              ratings: data.filter_options.ratings,
            }}
          />}
        </div>
      </section>

      {/* Featured Accommodation Section */}
      <section id="resorts" className="py-16">
        {/* ... (rest of the component JSX) ... */}
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
            <div className="mt-12">
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
