"use client";
import "swiper/css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import HolidayCard from "./HolidayCard";

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
];

export default function FeaturedHolidays() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto">
        <h2 className="text-center text-5xl font-medium mb-12 text-gray-800">
          Featured holidays
        </h2>
        <div className="w-full relative flex items-center min-h-[400px]">
          {/* {holidays.map((s, index) => (
            <div
              key={index}
              className="absolute z-20 border-white border-solid border-8 w-xs aspect-[0.9] rounded-xl left-1/2 -translate-x-1/2 hover:z-30"
            >
              <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
              <Image
                src={s.img}
                alt="Tea plantations"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
              <div className="z-20 absolute bottom-5 text-center w-full text-white">
                <div className="flex flex-row justify-center text-xl">
                  <p className="mr-4">{s.title}</p>
                  <a href="">
                    <Image
                      src="/icons/arrow.svg"
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
          {/* <div className="absolute left-0 z-0 border-white border-solid border-8 w-3xs aspect-[0.9] rounded-xl flex items-center hover:z-30">
            <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
            <Image
              src="/banners/image4.png"
              alt="Tea plantations"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="absolute left-1/4 -translate-x-1/4 z-10 border-white border-solid border-8 w-2xs aspect-[0.9] rounded-xl hover:z-30">
            <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
            <Image
              src="/banners/image3.png"
              alt="Tea plantations"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="absolute z-20 border-white border-solid border-8 w-xs aspect-[0.9] rounded-xl left-1/2 -translate-x-1/2 hover:z-30">
            <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
            <Image
              src="/banners/image9.png"
              alt="Tea plantations"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
            <div className="z-20 absolute bottom-5 text-center w-full text-white">
              <div className="flex flex-row justify-center text-xl">
                <p className="mr-4">title</p>
                <a href="">
                  <Image
                    src="/icons/arrow.svg"
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
          <div className="absolute left-3/4 -translate-x-3/4 z-10 border-white border-solid border-8 w-2xs aspect-[0.9] rounded-xl hover:z-30">
            <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
            <Image
              src="/banners/image2.png"
              alt="Tea plantations"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="absolute left-4/4 -translate-x-4/4 z-0 border-white border-solid border-8 w-3xs aspect-[0.9] rounded-xl hover:z-30">
            <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
            <Image
              src="/banners/image1.png"
              alt="Tea plantations"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div> */}
        </div>
        <div className="width-full">
          <Swiper
            slidesPerView={3}
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
                slidesPerView: 5, // ✅ desktop

              },
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {holidays.map((a, index) => (
              <SwiperSlide
                key={index}
                className=" rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <HolidayCard img={a.img} title={a.title} location={a.location}/>
              </SwiperSlide>
            ))}
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
