"use client";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import { useState, useEffect } from "react"; // Added useEffect for state synchronization

interface country {
  name: string,
  slug: string,
}

interface City {
  id: number,
  name: string
}

interface type {
  name: string,
  slug: string
}

interface rating {
  name: string,
  id: string
}

interface filter_options {
  countries: country[],
  cities: City[],
  types: type[],
  ratings: rating[]
}

interface FilterValues {
  name: string;
  country: string;
  city: string;
  type: string;
  rating: string;
}

interface AdvancedSearchFiltersProps {
  onSearch?: (query: string) => void;
  onFilterChange: (filters: FilterValues) => void; // ⬅️ Must be present and required!
  onSearchClick: (filters: FilterValues) => void; // ⬅️ NEW: Required for button click
  initialFilters: FilterValues;
  filterOptions: filter_options;
}


export default function AdvancedSearchFilters({
  onSearch,
  // 🛑 REMOVED onFilterChange from destructuring
  onSearchClick, // ⬅️ Use new prop
  filterOptions,
  initialFilters // The filters currently APPLIED (for displaying selected state)
}: AdvancedSearchFiltersProps) {
  
  // 1. State for PENDING (local) filters
  // Initialize with the currently applied filters from the parent
  const [pendingFilters, setPendingFilters] = useState<FilterValues>(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");
  
  // 2. Sync local state when initialFilters changes from parent (e.g., when a search is applied)
  useEffect(() => {
      setPendingFilters(initialFilters);
  }, [initialFilters]);

  const handleSearchQueryChange = (query: string) => {
      setSearchQuery(query);
      console.log(query);
      const newFilters = { ...pendingFilters, ["name"]: query };
      setPendingFilters(newFilters);
  };

  // 👇 Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // 3. Update PENDING filters only (no API call here)
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...pendingFilters, [key]: value };
    setPendingFilters(newFilters);
    // 🛑 REMOVED: onFilterChange?.(newFilters); // Immediate notification removed
  };

  // 4. Handle Search Button Click
  const handleSearchClick = () => {
    // ⬅️ NEW: Pass the pending (local) filter state to the parent
    onSearchClick(pendingFilters); 
    console.log("Search button clicked. Filters sent:", pendingFilters);
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <section className="py-8 md:py-0 px-5 md:px-0 rounded-none">
      <div className="mx-auto px-5 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] container p-5 rounded-[8px] gap-6 grid grid-cols-0 grid-rows-6 [grid-template-areas:'input'_'country'_'location'_'type'_'rating'_'button'] md:grid-cols-4 md:grid-rows-2 md:[grid-template-areas:'input_input_input_button'_'country_location_type_rating']">
        
        <SearchBar
          placeholder="Search destination..."
          query={searchQuery} // ⬅️ Pass current query
          onQueryChange={handleSearchQueryChange} // ⬅️ New handler
          // onSearch={onSearch} // This prop is no longer needed in the SearchBar if the main button handles the filter submit
          className="[grid-area:input]"
        />

        {/* Use pendingFilters for onSelect, but initialFilters for the displayed value */}
        <FilterDropdown
          label="Country"
          options={filterOptions.countries}
          value={pendingFilters.country} // ⬅️ Still uses APPLIED filters for display
          onSelect={(value) => handleFilterChange("country", value)}
          isOpen={openDropdown === "Country"}
          onToggle={() => toggleDropdown("Country")}
          className="[grid-area:country]"
        />

        <FilterDropdown
          label="Location"
          options={filterOptions.cities}
          value={pendingFilters.city} // ⬅️ Still uses APPLIED filters for display
          onSelect={(value) => handleFilterChange("city", value)}
          isOpen={openDropdown === "Location"}
          onToggle={() => toggleDropdown("Location")}
          className="[grid-area:location]"
        />
        
        <FilterDropdown
          label="Type"
          options={filterOptions.types}
          value={pendingFilters.type} // ⬅️ Still uses APPLIED filters for display
          onSelect={(value) => handleFilterChange("type", value)}
          isOpen={openDropdown === "Type"}
          onToggle={() => toggleDropdown("Type")}
          className="[grid-area:type]"
        />

        <FilterDropdown
          label="Rating"
          options={filterOptions.ratings}
          value={pendingFilters.rating} // ⬅️ Still uses APPLIED filters for display
          onSelect={(value) => handleFilterChange("rating", value)}
          isOpen={openDropdown === "Rating"}
          onToggle={() => toggleDropdown("Rating")}
          className="[grid-area:rating]"
        />

        <button 
          className="h-12 [grid-area:button] bg-blue-400 text-white rounded-md px-4 py-3"
          onClick={handleSearchClick} // ⬅️ NEW: Calls the handler to trigger parent filter
        >
          Search
        </button>
      </div>
    </section>
  );
}
