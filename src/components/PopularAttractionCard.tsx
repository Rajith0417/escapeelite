import React from "react";
import Image from "next/image";

interface AttractionCardProps {
  img: string;
  title: string;
  link: string;
  paragraph: string;
}

const basePath = process.env.NODE_ENV === "production" ? "/escapeelite" : "";

function AttractionCard(children: AttractionCardProps) {
  return (
    <div className="relative w-full">
      <Image
        src={`${basePath}${children.img}`}
        alt={children.title}
        width={200}
        height={100}
        className="w-full object-cover"
      />
      <div className="absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
      <div className="absolute bottom-0 z-20 p-4 text-left text-white font-montserrat">
        <h4 className="font-semibold text-xl">{children.title}</h4>
        <hr className="my-4" />
        <p className="font-medium text-sm line-clamp-3">{children.paragraph}</p>
        <a href="Read More" className="font-semibold block text-[14px] mt-4">Read More
          <Image
            src={`${basePath}/icons/arrowRight.svg`}
            alt={children.title}
            width={24}
            height={24}
            className="ml-0.5 inline"
          />
        </a>
      </div>
    </div>
  );
}

export default AttractionCard;
