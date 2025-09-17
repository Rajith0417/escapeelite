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
    <section className=" py-8 md:py-0 px-5 md:px-0 rounded-none">
      <div className="mx-auto px-5 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] container p-5 rounded-[8px] gap-6 grid grid-cols-0 grid-rows-6 [grid-template-areas:'input'_'country'_'location'_'type'_'rating'_'button'] md:grid-cols-4 md:grid-rows-2 md:[grid-template-areas:'input_input_input_button'_'country_location_type_rating']">
        {/* Main Search Bar */}
        <SearchBar
          placeholder="Search destination..."
          onSearch={onSearch}
          className="[grid-area:input]"
        />
        {/* Filter Dropdowns */}
        <FilterDropdown
          label="Country"
          options={filterOptions.countries}
          value={filters.country}
          onSelect={(value) => handleFilterChange("country", value)}
          className="[grid-area:country]"
        />
        <FilterDropdown
          label="Location"
          options={filterOptions.locations}
          value={filters.location}
          onSelect={(value) => handleFilterChange("location", value)}
          className="[grid-area:location]"
        />
        <FilterDropdown
          label="Type"
          options={filterOptions.types}
          value={filters.type}
          onSelect={(value) => handleFilterChange("type", value)}
          className="[grid-area:type]"
        />
        <FilterDropdown
          label="Rating"
          options={filterOptions.ratings}
          value={filters.rating}
          onSelect={(value) => handleFilterChange("rating", value)}
          className="[grid-area:rating]"
        />

        <button className="h-12 [grid-area:button] bg-blue-400 text-white rounded-md px-4 py-3">
          Search
        </button>
      </div>
    </section>
  );
} 
