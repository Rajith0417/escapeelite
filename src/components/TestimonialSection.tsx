import React from "react";
import Quote from "./Quote";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTestimonials } from "../../store/slices/testimonials";

export default function TestimonialSection() {

  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.testimonials);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // console.log(data);

  return (
    // <section className="pt-16 pb-32 md:py-16">
    //   <div className="container px-5 mx-auto text-center gap-15 flex items-center flex-col md:flex-row">
    //     <div className="w-full md:w-1/2">
    //       <video
    //         src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    //         controls
    //         autoPlay
    //         loop
    //         muted
    //         className="mx-5 w-[calc(100%-40px)] rounded-2xl"
    //       />
    //     </div>

    //     <div className="w-full md:w-1/2">
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
            modules={[Navigation, Autoplay, EffectFade]}
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


    //     </div>
    //   </div>
    // </section>
  );
}
