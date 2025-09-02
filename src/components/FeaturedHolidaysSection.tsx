"use client";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import HolidayCard from "./HolidayCard";

const holidays = [
  {
    title: "3 Star Holidays",
    location: "Maldives",
    img: "banners/image1.png",
  },
  {
    title: "Ancient Holidays",
    location: "Sri Lanka",
    img: "banners/image2.png",
  },
  {
    title: "Beach Holidays",
    location: "Sri Lanka",
    img: "banners/image3.png",
  },
  {
    title: "Nature Holidays",
    location: "Sri Lanka",
    img: "banners/image4.png",
  },
  {
    title: "5 Star Holidays",
    location: "Maldives",
    img: "banners/image5.png",
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
          {/* {holidays.map((s, index) => (
            <div
              key={index}
              className="absolute z-20 border-white border-solid border-8 w-xs aspect-[0.9] rounded-xl left-1/2 -translate-x-1/2 hover:z-30"
            >
              <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
              <Image
                src={s.img}
                alt="Tea plantations"
                fill
                
                className="rounded-xl"
              />
              <div className="z-20 absolute bottom-5 text-center w-full text-white">
                <div className="flex flex-row justify-center text-xl">
                  <p className="mr-4">{s.title}</p>
                  <a href="">
                    <Image
                      src="/icons/arrowRight.svg"
                      alt=""
                      width={24}
                      height={24}
                      className=""
                    />
                  </a>
                </div>
                <p>{s.location}</p>
              </div>
            </div>
          ))} */}
          <div className="absolute left-0 z-0 border-white border-solid border-8 w-[386px] aspect-[0.9] rounded-xl flex items-center hover:z-30">
            <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
            <Image
              src="banners/image4.png"
              alt="Tea plantations"
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="absolute left-1/4 -translate-x-1/4 z-10 border-white border-solid border-8 w-[404px] aspect-[0.9] rounded-xl hover:z-30">
            <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
            <Image
              src="banners/image3.png"
              alt="Tea plantations"
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="absolute z-20 border-white border-solid border-8 w-[440px] aspect-[0.9] rounded-xl left-1/2 -translate-x-1/2 hover:z-30">
            <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
            <Image
              src="banners/image9.png"
              alt="Tea plantations"
              fill
              className="rounded-xl object-cover"
            />
            <div className="z-20 absolute bottom-5 text-center w-full text-white">
              <div className="flex flex-row justify-center text-xl">
                <p className="mr-4">title</p>
                <a href="">
                  <Image
                    src="icons/arrowRight.svg"
                    alt=""
                    width={24}
                    height={24}
                    className=""
                  />
                </a>
              </div>
              <p>country</p>
            </div>
          </div>
          <div className="absolute left-3/4 -translate-x-3/4 z-10 border-white border-solid border-8 w-[404px] aspect-[0.9] rounded-xl hover:z-30">
            <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
            <Image
              src="banners/image2.png"
              alt="Tea plantations"
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="absolute left-4/4 -translate-x-4/4 z-0 border-white border-solid border-8 w-[386px] aspect-[0.9] rounded-xl hover:z-30">
            <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
            <Image
              src="banners/image1.png"
              alt="Tea plantations"
              fill
              className="rounded-xl object-cover"
            />
          </div>
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
