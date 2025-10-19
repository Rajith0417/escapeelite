"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import HolidayCard from "./HolidayCard";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchFeaturedHolidays } from "../../store/slices/featuredHolidays";

export default function FeaturedHolidaysSection() {

  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.featuredHolidays);

  useEffect(() => {
    dispatch(fetchFeaturedHolidays());
  }, [dispatch]);

  console.log("featured holidays");
  console.log(data);
  

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-5">
        <h2 className="text-center text-3xl font-medium text-gray-800 mb-12 md:mb-0">
          Featured holidays
        </h2>
        <div className="w-full relative md:flex items-center min-h-[400px] hidden">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={4}
            initialSlide={3}
            loop={true}
            coverflowEffect={{
              rotate: 6,        // how much the slides rotate
              stretch: 10,        // spacing between slides
              depth: 200,        // 3D depth
              modifier: 1,       // multiplier for effect
              slideShadows: false // remove side shadows
            }}
            modules={[EffectCoverflow]}
            className="w-full max-w-6xl"
          >
            {Array.isArray(data) && data?.map((holiday, index) => (
              <SwiperSlide
                className="rounded-xl p-1 text-center bg-white"
                key={index}
              >
                <HolidayCard
                  id={holiday.id}
                  img={holiday.image}
                  title={holiday.category_name}
                  location={holiday.country_name}
                  country = {holiday.country_slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full md:hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {Array.isArray(data) && data.map((holiday, index) => (
              <SwiperSlide key={index}>
                <HolidayCard
                  id={holiday.id}
                  img={holiday.image}
                  title={holiday.category_name}
                  location={holiday.country_name}
                  country = {holiday.country_slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
