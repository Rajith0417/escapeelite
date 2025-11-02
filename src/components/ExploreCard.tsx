import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ExploreCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
}
function ExploreCard({ id, name, description, image }: ExploreCardProps) {
  return (
    <div className="text-poppins flex flex-col w-full bg-white rounded-lg md:shadow-lg overflow-hidden border border-[#ECEBEB]">
      <div className="relative h-48 w-full mb-5">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 uppercase font-inter line-clamp-1">
          {name}
        </h3>
        <p className="text-gray-700 text-[14px] font-normal mb-4 line-clamp-3">
          {description}
        </p>
        <Link 
          className="text-blue-400 hover:text-blue-500 text-xs flex gap-2.5" 
          href={`/attractions/${id}`}> {/* this is correct no need basePath */}
          <span>Explore More</span>
          <Image
            src={`/icons/arrowBlue.svg`}
            alt=""
            width={12}
            height={12}
            className="ml-0.5 inline "
          />
        </Link>
      </div>
    </div>
  );
}

export default ExploreCard;
