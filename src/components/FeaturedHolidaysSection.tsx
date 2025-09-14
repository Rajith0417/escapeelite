"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import HolidayCard from "./HolidayCard";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const holidays = [
  {
    title: "3 Star Holidays",
    location: "Maldives",
    img: "/banners/image1.png",
  },
  {
    title: "Ancient Holidays",
    location: "Sri Lanka",
    img: "/banners/image2.png",
  },
  {
    title: "Beach Holidays",
    location: "Sri Lanka",
    img: "/banners/image3.png",
  },
  {
    title: "Nature Holidays",
    location: "Sri Lanka",
    img: "/banners/image4.png",
  },
  {
    title: "5 Star Holidays",
    location: "Maldives",
    img: "/banners/image5.png",
  },
  {
    title: "Beach Holidays",
    location: "Sri Lanka",
    img: "/banners/image6.jpg",
  },
  {
    title: "Nature Holidays",
    location: "Sri Lanka",
    img: "/banners/image7.png",
  },
  {
    title: "5 Star Holidays",
    location: "Maldives",
    img: "/banners/image8.png",
  },
  {
    title: "Beach Holidays",
    location: "Sri Lanka",
    img: "/banners/image9.png",
  },
  {
    title: "Nature Holidays",
    location: "Sri Lanka",
    img: "/banners/image10.png",
  },
  {
    title: "5 Star Holidays",
    location: "Maldives",
    img: "/banners/image11.png",
  },
];

export default function FeaturedHolidaysSection() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-5 md:px-0">
        <h2 className="text-center text-5xl font-medium mb-12 text-gray-800">
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
            className="w-full max-w-4xl"
          >
            {holidays.map((holiday, index) => (
              <SwiperSlide 
                className="rounded-xl p-1 text-center bg-white"
                key={index}
              >
                <HolidayCard
                  img={holiday.img}
                  title={holiday.title}
                  location={holiday.location}
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
            {holidays.map((holiday, index) => (
              <SwiperSlide key={index}>
                <HolidayCard
                  img={holiday.img}
                  title={holiday.title}
                  location={holiday.location}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
