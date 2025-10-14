import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AttractionCardProps {
  id: number;
  img: string;
  title: string;
  link: string;
  paragraph: string;
  country: string;
}

const basePath = process.env.NODE_ENV === "production" ? "/escapeelite" : "";

function AttractionCard(children: AttractionCardProps) {
  return (
    <div className="relative w-full aspect-square">
      <Image
        src={`https://www.escapeelite.com/admin/assets/images/attraction_images/${children.img}`}
        alt={children.title || "Popular attraction image"}
        fill
        className="object-cover"
      />
      <div className="absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
      <div className="absolute bottom-0 z-20 p-4 text-left text-white font-montserrat">
        <h4 className="font-semibold text-xl">{children.title}</h4>
        <hr className="my-4" />
        <p className="font-medium text-sm line-clamp-3">{children.paragraph}</p>
        <Link 
          href={`/attractions/${children.id}`} 
          className="font-semibold block text-[14px] mt-4"
        >
          Read More
          <Image
            src={`${basePath}/icons/arrowRight.svg`}
            alt={children.title || "Popular attraction image"}
            width={18}
            height={18}
            className="ml-0.5 inline"
          />
        </Link>
      </div>
    </div>
  );
}

export default AttractionCard;
