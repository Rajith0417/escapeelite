"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import AttractionCard from "./AttractionCard";
import "swiper/css/navigation";

const attractions = [
  {
    title: "Galle Sri Lanka",
    link: "",
    img: "/banners/image7.png",
    paragraph:
      "Colombo is in an exciting phase in its history. There is a sense of renewed ambition now that peace has been restored to Sri Lanka, but it remains a compact, manageable ...",
  },
  {
    title: "Colombo",
    link: "",
    img: "/banners/image8.png",
    paragraph:
      "Colombo is in an exciting phase in its history. There is a sense of renewed ambition now that peace has been restored to Sri Lanka, but it remains a compact, manageable ...",
  },
  {
    title: "Kandy Sri Lanka",
    link: "",
    img: "/banners/image10.png",
    paragraph:
      "Colombo is in an exciting phase in its history. There is a sense of renewed ambition now that peace has been restored to Sri Lanka, but it remains a compact, manageable ...",
  },
];

export default function Attractions() {
  return (
    <section id="attractions" className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-medium mb-12 text-gray-800">Popular Attractions</h3>
        <div className="width-full">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
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
            {attractions.map((a, index) => (
              <SwiperSlide
                key={index}
                className=" rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <AttractionCard img={a.img} title={a.title} link={a.link} paragraph={a.paragraph}/>
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
