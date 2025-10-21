"use client";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import { useState } from "react";

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

interface rating {
  name: string,
  id: number
}

interface filter_options {
  countries: country[],
  locations: location[],
  types: type[],
  ratings: rating[]
}
interface AdvancedSearchFiltersProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterValues) => void;
  filterOptions: filter_options;
}

interface FilterValues {
  country: string;
  location: string;
  type: string;
  rating: string;
}

// const filterOptions = {
//   countries: ["Sri Lanka", "Maldives", "India", "Seychelles", "Mauritius"],
//   locations: ["Colombo", "Kandy", "Galle", "Sigiriya", "Yala", "Anuradhapura"],
//   types: ["Hotel & Resort", "Beach Resort", "Boutique Hotel", "Villa", "Guesthouse"],
//   ratings: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
// };

export default function AdvancedSearchFilters({
  onSearch,
  onFilterChange,
  filterOptions
}: AdvancedSearchFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    country: "",
    location: "",
    type: "",
    rating: "",
  });

  // 👇 Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <section className="py-8 md:py-0 px-5 md:px-0 rounded-none">
      <div className="mx-auto px-5 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] container p-5 rounded-[8px] gap-6 grid grid-cols-0 grid-rows-6 [grid-template-areas:'input'_'country'_'location'_'type'_'rating'_'button'] md:grid-cols-4 md:grid-rows-2 md:[grid-template-areas:'input_input_input_button'_'country_location_type_rating']">
        
        <SearchBar
          placeholder="Search destination..."
          onSearch={onSearch}
          className="[grid-area:input]"
        />

        {/* Each dropdown now receives openDropdown + toggleDropdown */}
        <FilterDropdown
          label="Country"
          options={filterOptions.countries}
          value={filters.country}
          onSelect={(value) => handleFilterChange("country", value)}
          isOpen={openDropdown === "Country"}
          onToggle={() => toggleDropdown("Country")}
          className="[grid-area:country]"
        />

        <FilterDropdown
          label="Location"
          options={filterOptions.locations}
          value={filters.location}
          onSelect={(value) => handleFilterChange("location", value)}
          isOpen={openDropdown === "Location"}
          onToggle={() => toggleDropdown("Location")}
          className="[grid-area:location]"
        />

        <FilterDropdown
          label="Type"
          options={filterOptions.types}
          value={filters.type}
          onSelect={(value) => handleFilterChange("type", value)}
          isOpen={openDropdown === "Type"}
          onToggle={() => toggleDropdown("Type")}
          className="[grid-area:type]"
        />

        <FilterDropdown
          label="Rating"
          options={filterOptions.ratings}
          value={filters.rating}
          onSelect={(value) => handleFilterChange("rating", value)}
          isOpen={openDropdown === "Rating"}
          onToggle={() => toggleDropdown("Rating")}
          className="[grid-area:rating]"
        />

        <button className="h-12 [grid-area:button] bg-blue-400 text-white rounded-md px-4 py-3">
          Search
        </button>
      </div>
    </section>
  );
}
