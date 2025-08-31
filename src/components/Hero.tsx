import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen"
    >
      <Image
        src="banners/image9.png"
        alt=""
        fill
        className="object-cover object-center"
      />
      <div className="absolute z-0 inset-0 bg-black opacity-50"></div>
      <div className="container h-full w-full px-5 mx-auto flex flex-col md:flex-row items-center justify-center md:justify-start text-white text-center]">
        <div className="hidden float-left z-10 md:w-1/2 md:block pl-16">
          <h2 className="text-4xl md:text-4xl font-medium mb-4 text-left">
            We Specialize in Sri Lanka & the Maldives – Get Your Free Custom
            Itinerary!
          </h2>
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
