import React from "react";
import Image from "next/image";

interface ExploreCardProps {
    id: number;
    name: string;
    description: string;
    image: string;
}

function ExploreCard({id, name, description, image}: ExploreCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-101"
    >
      <div className="relative h-48 w-full">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">
          {name}
        </h3>
        <p className="text-gray-600">{description}</p>
        <a href="">Explore More</a>
      </div>
    </div>
  );
}

export default ExploreCard;
