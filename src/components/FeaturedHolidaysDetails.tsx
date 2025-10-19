"use client";
import HolidayCardDetails from "./HolidayCardDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchFeaturedHolidaysDetails } from "../../store/slices/featuredHolidaysDetails";

type FeaturedHolidaysDetailsProps = {
  heading?: string;
  dropdownOptions?: string[];
  selectedOption?: string;
  country?: string;
  onDropdownChange?: (value: string) => void;
};

export default function FeaturedHolidaysDetails({
  heading = "Featured holidays to SRI LANKA",
  dropdownOptions = ["All Holidays", "Wildlife", "Beaches", "Cultural"],
  country = "maldives",
  selectedOption,
  onDropdownChange,
}: FeaturedHolidaysDetailsProps) {

  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.featuresHolidaysDetails);

  useEffect(() => {
    dispatch(fetchFeaturedHolidaysDetails(country));
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  console.log("featured holidays details");
  console.log(data);

  return (
    <section className="py-16">
      <div className="container mx-auto px-5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-3xl text-center md:text-left font-medium text-gray-900">
            {heading}
          </h2>
          <div className="hidden md:block">
            <select
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none"
              value={selectedOption}
              onChange={(e) => onDropdownChange?.(e.target.value)}
            >
              {dropdownOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swiper carousel */}
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          wrapperClass="flex pb-3"
          pagination={{
            clickable: true,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination, Navigation]}
          className="featured-holidays-swiper123 !p-1"
        >
          {data && data.map((fhd, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <div className="h-full">
                <HolidayCardDetails
                  imageSrc={fhd.image}
                  title={fhd.package_name}
                  description={fhd.package_description}
                  duration={fhd.no_of_days}
                  season={fhd.best_times}
                  price={fhd.price_starting_from}
                  onViewMoreHref={`/${country}/${fhd.id}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
