"use client"

import React, { useState } from "react";
import ImageLeftRight from "./ImageLeftRight";
import Pagination from "./Pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
interface Details {
  id: string;
  heading: string;
  description: string;
  image: string;
}
interface ImageLeftRightSectionProps {
  contents: Details[];
}

// const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
// const imageBaseUrl = "https://www.escapeelite.com/admin/assets/images/attraction_detail_images/";
// const fallbackImage = "https://www.escapeelite.com/admin/assets/img/faces/face-0.jpg";

export default function ImageLeftRightSection({contents}: ImageLeftRightSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Calculate pagination
  const totalPages = Math.ceil(contents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContents = contents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // console.log(page);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-5">
        <div className="hidden md:block">
          {currentContents.map((content, index) => (
            <ImageLeftRight
              key={index}
              img={content.image}
              alt={content.heading}
              title={content.heading}
              paragraph={content.description}
              // format={index % 2 === 0 ? "right" : "left"}
              format={(startIndex + index) % 2 === 0 ? "right" : "left"} 
            />
          ))}
        </div>

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
        <div className="block md:hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            // pagination={{
            // clickable: true,
            // }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {contents.map((content, index) => (
              <SwiperSlide
                key={index}
                className=" rounded-xl md:shadow-lg transition overflow-hidden"
              >
                <ImageLeftRight
                  key={index}
                  img={content.image}
                  alt={content.heading}
                  title={content.heading}
                  paragraph={content.description}
                  format="right"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
