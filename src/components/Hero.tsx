"use client"
import React from "react";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
interface heroProps {
  image: string;
  titleDesktop?: string;
  titleMobile?: string;
  paragraph?: string;
  rating?: number;
  fullScreen?: boolean;
}

export default function Hero({image, titleDesktop, titleMobile, paragraph, rating, fullScreen=true}: heroProps) {

  return (
    <section
      id="home"
      className={`relative ${fullScreen ? "h-screen" : "h-[306px] md:h-[700px]"}`}
    >
      <Image
        src={`${basePath}${image}`}
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
          {rating && (<div className="flex items-center mb-5">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-10 h-10 ${
                rating !== undefined && index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
          )}
        </div>
        <div className="px-16 z-10 md:hidden text-center md:text-left">
          <h2 className="text-4xl md:text-4xl font-medium mb-4">
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
