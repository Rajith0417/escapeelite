import React from "react";

export default function Hero() {
  return (
    <section
      id="home"
      className="h-screen bg-cover bg-center flex flex-row items-center text-white text-center bg-[url(/banners/image9.png)]"    >
      <div className="absolute z-0 inset-0 bg-black opacity-50"></div>
      <div className="hidden container float-left z-10 w-1/2 md:block pl-16">
        <h2 className="text-4xl md:text-4xl font-medium mb-4 text-left">
          We Specialize in Sri Lanka & the Maldives – Get Your Free Custom Itinerary!
        </h2>
      </div>
      <div className="continer px-16 z-10 md:hidden">
        <h2 className="text-4xl md:text-4xl font-medium mb-4 text-center">
          Welcome to Escape Elite
        </h2>
      </div>
      {/* <div className="z-10 w-1/2">
        <p className="text-lg md:text-xl mb-6">
          Get Your Free Custom Itinerary in 2 Minutes!
        </p>
      </div> */}
    </section>
  );
}
