import React from "react";
import Image from "next/image";

interface ExploreCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
}

const basePath = process.env.NODE_ENV === "production" ? "/escapeelite" : "";

function ExploreCard({ id, name, description, image }: ExploreCardProps) {
  return (
    <div className="flex flex-col w-full bg-white rounded-lg md:shadow-lg overflow-hidden border border-[#ECEBEB]">
      <div className="relative h-48 w-full mb-5">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <h3 className="mb-6 text-3xl font-semibold text-gray-900 uppercase font-inter">
          {name}
        </h3>
        <p className="text-gray-700 text-base font-semibold mb-6">
          {description}
        </p>
        <a className="text-blue-400 hover:text-blue-500 flex gap-2.5" href={`/attractions/${id}`}>
          <span>Explore More</span>
          <Image
            src={`${basePath}/icons/arrowBlue.svg`}
            alt=""
            width={16}
            height={16}
            className="ml-0.5 inline"
          />
        </a>
      </div>
    </div>
  );
}

export default ExploreCard;
