import React from "react";
import Image from "next/image";

interface heroProps {
  image: string,
  titleDesktop?: string,
  titleMobile?: string,
  paragraph?: string
}

export default function Hero({image, titleDesktop, titleMobile, paragraph}: heroProps) {
  return (
    <section
      id="home"
      className="relative h-screen md:h-[750px]"
    >
      <Image
        src={image}
        alt=""
        fill
        className="object-cover object-center"
      />
      <div className="absolute z-0 inset-0 bg-black opacity-50"></div>
      <div className="container h-full w-full px-5 mx-auto flex flex-col md:flex-row items-center justify-center md:justify-start text-white text-center]">
        <div className="hidden float-left z-10 md:w-1/2 md:block pl-16">
          <h2 className="text-4xl md:text-4xl font-medium mb-4 text-left">
            {titleDesktop}
          </h2>
          <p>
            {paragraph}
          </p>
        </div>
        <div className="px-16 z-10 md:hidden">
          <h2 className="text-4xl md:text-4xl font-medium mb-4 text-center">
            {titleMobile}
          </h2>
          <p>
            {paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
