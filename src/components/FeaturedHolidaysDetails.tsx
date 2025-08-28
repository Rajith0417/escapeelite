"use client";
import HolidayCardDetails from "./HolidayCardDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

interface HolidayItem {
  imageSrc: string;
  title: string;
  description: string;
  duration: string;
  season: string;
  price: string;
}

const dummyHolidays: HolidayItem[] = [
  {
    imageSrc: "banners/image6.jpg",
    title: "Nature & Wildlife Tours",
    description:
      "Holidays to Sri Lanka with wildlife, culture, central hills & south coast beach stay",
    duration: "12 days",
    season: "Jan-Jun | Sep-Dec",
    price: "£1,440.00",
  },
  {
    imageSrc: "banners/image9.png",
    title: "Yala wildlife, Sigiriya, Central Hills & South beach",
    description:
      "Holidays to Sri Lanka with wildlife, culture, central hills & south coast beach stay central hills & south coast beach  central hills & south coast beach ",
    duration: "12 days",
    season: "Jan-Jun | Oct-Dec",
    price: "£1,440.00",
  },
  {
    imageSrc: "banners/image8.png",
    title: "South Coast Beach Explorer",
    description:
      "Holidays to Sri Lanka with wildlife, culture, central hills & south coast beach stay",
    duration: "12 days",
    season: "Jan-Jun | Sep-Dec",
    price: "£1,440.00",
  },
  {
    imageSrc: "banners/image1.png",
    title: "Wilpattu wildlife, Ancient Sri Lanka & Central Hills",
    description:
      "Holidays to Sri Lanka with wildlife, culture, central hills & south coast beach stay",
    duration: "12 days",
    season: "Jan-Dec",
    price: "£1,440.00",
  },
  {
    imageSrc: "banners/image6.jpg",
    title: "Nature & Wildlife Tours",
    description:
      "Holidays to Sri Lanka with wildlife, culture, central hills & south coast beach stay",
    duration: "12 days",
    season: "Jan-Jun | Sep-Dec",
    price: "£1,440.00",
  },
  {
    imageSrc: "banners/image9.png",
    title: "Yala wildlife, Sigiriya, Central Hills & South beach",
    description:
      "Holidays to Sri Lanka with wildlife, culture, central hills & south coast beach stay central hills & south coast beach  central hills & south coast beach ",
    duration: "12 days",
    season: "Jan-Jun | Oct-Dec",
    price: "£1,440.00",
  },
  {
    imageSrc: "banners/image8.png",
    title: "South Coast Beach Explorer",
    description:
      "Holidays to Sri Lanka with wildlife, culture, central hills & south coast beach stay",
    duration: "12 days",
    season: "Jan-Jun | Sep-Dec",
    price: "£1,440.00",
  },
  {
    imageSrc: "banners/image1.png",
    title: "Wilpattu wildlife, Ancient Sri Lanka & Central Hills",
    description:
      "Holidays to Sri Lanka with wildlife, culture, central hills & south coast beach stay",
    duration: "12 days",
    season: "Jan-Dec",
    price: "£1,440.00",
  },
];

export default function FeaturedHolidaysDetails() {
  return (
    <section className="py-14">
      <div className="container mx-auto px-5 md:px-0">
        {/* Header row */}
        <div className="flex items-center justify-between mb-14">
          <h2 className="text-3xl md:text-3xl text-center md:text-left font-medium text-gray-900">
            Featured holidays to SRI LANKA
          </h2>
          <div className="hidden md:block">
            <select className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none">
              <option>All Holidays</option>
              <option>Wildlife</option>
              <option>Beaches</option>
              <option>Cultural</option>
            </select>
          </div>
        </div>

        {/* Swiper carousel */}
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          wrapperClass="flex"
          // slideClass="test123"
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
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination, Navigation]}
          className="featured-holidays-swiper123 !p-1"
        >
          {dummyHolidays.map((h, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <div className="h-full">
              <HolidayCardDetails
                imageSrc={h.imageSrc}
                title={h.title}
                description={h.description}
                duration={h.duration}
                season={h.season}
                price={h.price}
                onViewMoreHref="#"
              />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
