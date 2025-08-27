import React from "react";
import ImageGallery from "./ImageGallery";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="h-screen flex flex-col md:flex-row items-center text-white text-center]"
    >
      <Image
        src="banners/image9.png"
        alt=""
        width={0}
        height={0}
        className="absolute w-full h-full object-fill"
      />
      <div className="absolute z-0 inset-0 bg-black opacity-50"></div>
      <div className="container px-5 mx-auto flex flex-col md:flex-row">
        <div className="hidden float-left z-10 w-full md:w-1/2 md:block pl-16">
          <h2 className="text-4xl md:text-4xl font-medium mb-4 text-left">
            We Specialize in Sri Lanka & the Maldives – Get Your Free Custom
            Itinerary!
          </h2>
        </div>
        <div className="w-full md:w-1/2">
          <ImageGallery />
        </div>
        <div className="px-16 z-10 md:hidden">
          <h2 className="text-4xl md:text-4xl font-medium mb-4 text-center">
            Welcome to Escape Elite!
          </h2>
        </div>
      </div>
    </section>
  );
}
