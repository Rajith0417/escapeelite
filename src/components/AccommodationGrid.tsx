"use client";
// import Swiper from "swiper";
import AccommodationCard from "./AccommodationCard";
// import { SwiperSlide } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";

interface Accommodation {
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

interface AccommodationGridProps {
  accommodations: Accommodation[];
  className?: string;
}

export default function AccommodationGrid({ accommodations, className = ""}: AccommodationGridProps) {
  return (
    <>
    <div className={`hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {accommodations.map((accommodation) => (
        <AccommodationCard
          key={accommodation.id}
          imageSrc={accommodation.image_url}
          title={accommodation.name}
          description={accommodation.description_preview}
          rating={accommodation.star_rating}
          tag={accommodation.category_name}
          onViewDetailsHref={`hotels/${accommodation.slug}`}
        />
      ))}
    </div>
    <div className="block md:hidden">
      <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 1, // ✅ mobile
              },
              640: {
                slidesPerView: 2, // ✅ tablet
              },
              1024: {
                slidesPerView: 3, // ✅ desktop
              },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {accommodations.map((accommodation, index) => (
              <SwiperSlide
                key={index}
                className=" rounded-xl md:shadow-lg transition overflow-hidden"
              >
                <AccommodationCard
                  key={accommodation.id}
                  imageSrc={accommodation.image_url}
                  title={accommodation.name}
                  description={accommodation.description_preview}
                  rating={accommodation.star_rating}
                  tag={accommodation.category_name}
                  onViewDetailsHref={`/hotels/${accommodation.id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
    </div>
    </>
  );
} 
