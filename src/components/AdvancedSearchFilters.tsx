"use client";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import { useState } from "react";

interface AdvancedSearchFiltersProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterValues) => void;
}

interface FilterValues {
  country: string;
  location: string;
  type: string;
  rating: string;
}

const filterOptions = {
  countries: ["Sri Lanka", "Maldives", "India", "Seychelles", "Mauritius"],
  locations: ["Colombo", "Kandy", "Galle", "Sigiriya", "Yala", "Anuradhapura"],
  types: ["Hotel & Resort", "Beach Resort", "Boutique Hotel", "Villa", "Guesthouse"],
  ratings: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
};

export default function AdvancedSearchFilters({
  onSearch,
  onFilterChange,
}: AdvancedSearchFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    country: "",
    location: "",
    type: "",
    rating: "",
  });

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    // <section className="bg-white py-8 px-5 md:px-0">
      <div className="container p-5 rounded-[8px] mx-auto shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]">
        {/* Main Search Bar */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SearchBar
            placeholder="Search destination..."
            onSearch={onSearch}
            className="lg:col-span-3"
          />
          <button className="lg:col-span-1 bg-blue-400 text-white rounded-lg px-4 py-2">
            Search
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FilterDropdown
            label="Country"
            options={filterOptions.countries}
            value={filters.country}
            onSelect={(value) => handleFilterChange("country", value)}
          />
          <FilterDropdown
            label="Location"
            options={filterOptions.locations}
            value={filters.location}
            onSelect={(value) => handleFilterChange("location", value)}
          />
          <FilterDropdown
            label="Type"
            options={filterOptions.types}
            value={filters.type}
            onSelect={(value) => handleFilterChange("type", value)}
          />
          <FilterDropdown
            label="Rating"
            options={filterOptions.ratings}
            value={filters.rating}
            onSelect={(value) => handleFilterChange("rating", value)}
          />
        </div>
      </div>
    // </section>
  );
} 
