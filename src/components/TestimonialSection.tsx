import React from "react";
import Quote from "./Quote";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTestimonials } from "../../store/slices/testimonials";

export default function TestimonialSection() {

  // const holidays = [
  //   {
  //     id: 1,
  //     title: "3 Star Holidays",
  //     location: "Maldives",
  //     img: "/banners/image1.png",
  //   },
  //   {
  //     id: 2,
  //     title: "Ancient Holidays",
  //     location: "Sri Lanka",
  //     img: "/banners/image2.png",
  //   },
  //   {
  //     id: 3,
  //     title: "Beach Holidays",
  //     location: "Sri Lanka",
  //     img: "/banners/image3.png",
  //   },
  //   {
  //     id: 4,
  //     title: "Nature Holidays",
  //     location: "Sri Lanka",
  //     img: "/banners/image4.png",
  //   },
  //   {
  //     id: 5,
  //     title: "5 Star Holidays",
  //     location: "Maldives",
  //     img: "/banners/image5.png",
  //   },
  //   {
  //     id: 6,
  //     title: "Beach Holidays",
  //     location: "Sri Lanka",
  //     img: "/banners/image6.jpg",
  //   },
  //   {
  //     id: 7,
  //     title: "Nature Holidays",
  //     location: "Sri Lanka",
  //     img: "/banners/image7.png",
  //   },
  //   {
  //     id: 8,
  //     title: "5 Star Holidays",
  //     location: "Maldives",
  //     img: "/banners/image8.png",
  //   },
  //   {
  //     id: 9,
  //     title: "Beach Holidays",
  //     location: "Sri Lanka",
  //     img: "/banners/image9.png",
  //   },
  //   {
  //     id: 10,
  //     title: "Nature Holidays",
  //     location: "Sri Lanka",
  //     img: "/banners/image10.png",
  //   },
  //   {
  //     id: 11,
  //     title: "5 Star Holidays",
  //     location: "Maldives",
  //     img: "/banners/image11.png",
  //   },
  // ];

  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.testimonials);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  console.log(data);

  return (
    <section className="pt-16 pb-32 md:py-16">
      <div className="container px-5 mx-auto text-center gap-15 flex items-center flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <video
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            controls
            autoPlay
            loop
            muted
            className="mx-5 w-[calc(100%-40px)] rounded-2xl"
          />
        </div>

        <div className="w-full md:w-1/2">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            loopPreventsSliding={false} // ✅ allow continuous autoplay even with fade
            effect="fade"
            fadeEffect={{ crossFade: true }} // ✅ smoother transitions
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={false}
            modules={[Pagination, Navigation, Autoplay, EffectFade]}
            className="mySwiper"
          >
            {data.map((quot, index) => (
              <SwiperSlide
                key={index}
                className="rounded-xl p-1 text-center bg-white pb-14"
              >
                <Quote
                  image={quot.image}
                  text={quot.description}
                  name={quot.customer}
                  location={quot.location}
                />
              </SwiperSlide>
            ))}
          </Swiper>


        </div>
      </div>
    </section>
  );
}
