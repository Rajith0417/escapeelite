"use client";
import React, { useState } from "react";
import ExploreCard from "./ExploreCard";
import Pagination from "./Pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export default function ExploreCardSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const cards = [
    {
      id: 1,
      name: "Ancient City of Sigiriya",
      description:
        "A spectacular rock fortress and palace ruin surrounded by extensive gardens",
      image: "images/sigiriya.jpg", // You'll need to add this image
    },
    {
      id: 2,
      name: "Sacred City of Kandy",
      description:
        "Home to the Temple of the Tooth Relic, one of Buddhism's most sacred sites",
      image: "images/kandy.jpg", // You'll need to add this image
    },
    {
      id: 3,
      name: "Old Town of Galle",
      description:
        "A fortified city built by European colonists in South and Southeast Asia",
      image: "images/galle.jpg", // You'll need to add this image
    },
    {
      id: 4,
      name: "Golden Temple of Dambulla",
      description:
        "A well-preserved cave temple complex with Buddhist mural paintings and statues",
      image: "images/dambulla.jpg", // You'll need to add this image
    },
    {
      id: 5,
      name: "Sinharaja Forest Reserve",
      description:
        "The country's last viable area of primary tropical rainforest with endemic wildlife",
      image: "images/sinharaja.jpg", // You'll need to add this image
    },
    {
      id: 6,
      name: "Ancient City of Polonnaruwa",
      description:
        "The medieval capital with well-preserved ruins of beautiful gardens and monuments",
      image: "images/polonnaruwa.jpg", // You'll need to add this image
    },
    {
      id: 7,
      name: "Sacred City of Anuradhapura",
      description:
        "One of the ancient capitals of Sri Lanka, famous for its well-preserved ruins",
      image: "images/anuradhapura.jpg", // You'll need to add this image
    },
    {
      id: 8,
      name: "Central Highlands of Sri Lanka",
      description:
        "A region of montane rainforests with an exceptionally rich biodiversity",
      image: "images/highland.jpg", // You'll need to add this image
    },
    {
      id: 9,
      name: "Ancient City of Sigiriya",
      description:
        "A spectacular rock fortress and palace ruin surrounded by extensive gardens",
      image: "images/sigiriya.jpg", // You'll need to add this image
    },
    {
      id: 10,
      name: "Sacred City of Kandy",
      description:
        "Home to the Temple of the Tooth Relic, one of Buddhism's most sacred sites",
      image: "images/kandy.jpg", // You'll need to add this image
    },
    {
      id: 11,
      name: "Old Town of Galle",
      description:
        "A fortified city built by European colonists in South and Southeast Asia",
      image: "images/galle.jpg", // You'll need to add this image
    },
  ];

  const itemsPerPage = 9;

  // Calculate pagination
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <div className="container mx-auto px-4 py-12">
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-6">
            {currentCards.map((card) => (
              <ExploreCard
                key={card.id}
                id={card.id}
                name={card.name}
                description={card.description}
                image={card.image}
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
        </div>
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
            {cards.map((card, index) => (
              <SwiperSlide
                key={index}
                className=" rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <ExploreCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  description={card.description}
                  image={card.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
