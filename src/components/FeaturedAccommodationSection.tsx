"use client";
import { useState, useMemo } from "react";
import AdvancedSearchFilters from "./AdvancedSearchFilters";
import AccommodationGrid from "./AccommodationGrid";
import Pagination from "./Pagination";

interface Accommodation {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  rating: number;
  tag: string;
  country: string;
  location: string;
  type: string;
}

interface FilterValues {
  country: string;
  location: string;
  type: string;
  rating: string;
}

// Dummy data
const dummyAccommodations: Accommodation[] = [
  {
    id: "1",
    imageSrc: "banners/image5.png",
    title: "HERITANCE KANDALAMA",
    description:
      "Heritance Kandalama Is An Architectural Masterpiece By Geoffrey Bawa, Built Overlooking The Eight...",
    rating: 5,
    tag: "Hotel & Resort",
    country: "Sri Lanka",
    location: "Kandy",
    type: "Hotel & Resort",
  },
  {
    id: "2",
    imageSrc: "banners/image6.jpg",
    title: "HOLIDAY ISLAND",
    description:
      "Experience luxury and comfort at Holiday Island Resort, featuring stunning ocean views and world-class amenities.",
    rating: 4,
    tag: "Beach Resort",
    country: "Sri Lanka",
    location: "Galle",
    type: "Beach Resort",
  },
  {
    id: "3",
    imageSrc: "banners/image7.png",
    title: "THE KINGSBURY",
    description:
      "Located in the heart of Colombo, The Kingsbury offers premium accommodation with city skyline views.",
    rating: 5,
    tag: "Hotel & Resort",
    country: "Sri Lanka",
    location: "Colombo",
    type: "Hotel & Resort",
  },
  {
    id: "4",
    imageSrc: "banners/image8.png",
    title: "SIGIRIYA VILLAGE",
    description:
      "Immerse yourself in the cultural heritage of Sri Lanka at this boutique hotel near the ancient Sigiriya rock.",
    rating: 4,
    tag: "Boutique Hotel",
    country: "Sri Lanka",
    location: "Sigiriya",
    type: "Boutique Hotel",
  },
  {
    id: "5",
    imageSrc: "banners/image9.png",
    title: "YALA SAFARI LODGE",
    description:
      "Experience wildlife up close at this luxury lodge located near Yala National Park.",
    rating: 5,
    tag: "Hotel & Resort",
    country: "Sri Lanka",
    location: "Yala",
    type: "Hotel & Resort",
  },
  {
    id: "6",
    imageSrc: "banners/image1.png",
    title: "ANURADHAPURA HERITAGE",
    description:
      "Discover ancient Sri Lankan history at this heritage hotel in the sacred city of Anuradhapura.",
    rating: 4,
    tag: "Boutique Hotel",
    country: "Sri Lanka",
    location: "Anuradhapura",
    type: "Boutique Hotel",
  },
  {
    id: "7",
    imageSrc: "banners/image2.png",
    title: "COLOMBO MARINA",
    description:
      "Modern luxury hotel with marina views, perfect for business and leisure travelers.",
    rating: 5,
    tag: "Hotel & Resort",
    country: "Sri Lanka",
    location: "Colombo",
    type: "Hotel & Resort",
  },
  {
    id: "8",
    imageSrc: "banners/image3.png",
    title: "KANDY HILLS RETREAT",
    description:
      "Peaceful mountain retreat offering panoramic views of the Kandy hills and tea plantations.",
    rating: 4,
    tag: "Boutique Hotel",
    country: "Sri Lanka",
    location: "Kandy",
    type: "Boutique Hotel",
  },
  {
    id: "9",
    imageSrc: "banners/image4.png",
    title: "GALLE FORT SUITES",
    description:
      "Historic accommodation within the UNESCO World Heritage Galle Fort, blending heritage with luxury.",
    rating: 5,
    tag: "Boutique Hotel",
    country: "Sri Lanka",
    location: "Galle",
    type: "Boutique Hotel",
  },
  {
    id: "10",
    imageSrc: "banners/image3.png",
    title: "KANDY HILLS RETREAT",
    description:
      "Peaceful mountain retreat offering panoramic views of the Kandy hills and tea plantations.",
    rating: 4,
    tag: "Boutique Hotel",
    country: "Sri Lanka",
    location: "Kandy",
    type: "Boutique Hotel",
  },
  {
    id: "11",
    imageSrc: "banners/image5.png",
    title: "HERITANCE KANDALAMA",
    description:
      "Heritance Kandalama Is An Architectural Masterpiece By Geoffrey Bawa, Built Overlooking The Eight...",
    rating: 5,
    tag: "Hotel & Resort",
    country: "Sri Lanka",
    location: "Kandy",
    type: "Hotel & Resort",
  },
  {
    id: "12",
    imageSrc: "banners/image6.jpg",
    title: "HOLIDAY ISLAND",
    description:
      "Experience luxury and comfort at Holiday Island Resort, featuring stunning ocean views and world-class amenities.",
    rating: 4,
    tag: "Beach Resort",
    country: "Sri Lanka",
    location: "Galle",
    type: "Beach Resort",
  },
  {
    id: "13",
    imageSrc: "banners/image7.png",
    title: "THE KINGSBURY",
    description:
      "Located in the heart of Colombo, The Kingsbury offers premium accommodation with city skyline views.",
    rating: 5,
    tag: "Hotel & Resort",
    country: "Sri Lanka",
    location: "Colombo",
    type: "Hotel & Resort",
  },
  {
    id: "14",
    imageSrc: "banners/image8.png",
    title: "SIGIRIYA VILLAGE",
    description:
      "Immerse yourself in the cultural heritage of Sri Lanka at this boutique hotel near the ancient Sigiriya rock.",
    rating: 4,
    tag: "Boutique Hotel",
    country: "Sri Lanka",
    location: "Sigiriya",
    type: "Boutique Hotel",
  },
  {
    id: "15",
    imageSrc: "banners/image9.png",
    title: "YALA SAFARI LODGE",
    description:
      "Experience wildlife up close at this luxury lodge located near Yala National Park.",
    rating: 5,
    tag: "Hotel & Resort",
    country: "Sri Lanka",
    location: "Yala",
    type: "Hotel & Resort",
  },
  {
    id: "16",
    imageSrc: "banners/image1.png",
    title: "ANURADHAPURA HERITAGE",
    description:
      "Discover ancient Sri Lankan history at this heritage hotel in the sacred city of Anuradhapura.",
    rating: 4,
    tag: "Boutique Hotel",
    country: "Sri Lanka",
    location: "Anuradhapura",
    type: "Boutique Hotel",
  },
  {
    id: "17",
    imageSrc: "banners/image2.png",
    title: "COLOMBO MARINA",
    description:
      "Modern luxury hotel with marina views, perfect for business and leisure travelers.",
    rating: 5,
    tag: "Hotel & Resort",
    country: "Sri Lanka",
    location: "Colombo",
    type: "Hotel & Resort",
  },
  {
    id: "18",
    imageSrc: "banners/image3.png",
    title: "KANDY HILLS RETREAT",
    description:
      "Peaceful mountain retreat offering panoramic views of the Kandy hills and tea plantations.",
    rating: 4,
    tag: "Boutique Hotel",
    country: "Sri Lanka",
    location: "Kandy",
    type: "Boutique Hotel",
  },
  {
    id: "19",
    imageSrc: "banners/image4.png",
    title: "GALLE FORT SUITES",
    description:
      "Historic accommodation within the UNESCO World Heritage Galle Fort, blending heritage with luxury.",
    rating: 5,
    tag: "Boutique Hotel",
    country: "Sri Lanka",
    location: "Galle",
    type: "Boutique Hotel",
  },
];

export default function FeaturedAccommodationSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterValues>({
    country: "",
    location: "",
    type: "",
    rating: "",
  });

  const itemsPerPage = 9;

  // Filter accommodations based on search and filters
  const filteredAccommodations = useMemo(() => {
    return dummyAccommodations.filter((accommodation) => {
      const matchesSearch =
        searchQuery === "" ||
        accommodation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        accommodation.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCountry =
        filters.country === "" || accommodation.country === filters.country;
      const matchesLocation =
        filters.location === "" || accommodation.location === filters.location;
      const matchesType =
        filters.type === "" || accommodation.type === filters.type;
      const matchesRating =
        filters.rating === "" ||
        accommodation.rating === parseInt(filters.rating.split(" ")[0]);

      return (
        matchesSearch &&
        matchesCountry &&
        matchesLocation &&
        matchesType &&
        matchesRating
      );
    });
  }, [searchQuery, filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAccommodations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAccommodations = filteredAccommodations.slice(
    startIndex,
    endIndex
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section className="bg-gray-800 relative md:h-1 md:my-24">
        {/* Advanced Search Filters */}
        <div className="z-10 md:w-3/4 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
          <AdvancedSearchFilters
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </div>
      </section>
      {/* Featured Accommodation Section */}
      <section id="resorts" className="py-14">
        <div className="container mx-auto px-5 md:px-0">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 mb-4">
              Featured Accommodation
            </h2>
            {/* <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium accommodations across
              Sri Lanka
            </p> */}
          </div>

          {/* Results count */}
          {/* <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredAccommodations.length} of{" "}
              {dummyAccommodations.length} accommodations
            </p>
          </div> */}

          {/* Accommodation Grid */}
          {currentAccommodations.length > 0 ? (
            <AccommodationGrid accommodations={currentAccommodations} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No accommodations found matching your criteria.
              </p>
            </div>
          )}

          {/* Pagination */}
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
      </section>
    </>
  );
}
