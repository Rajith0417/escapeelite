import React from "react";
import Image from "next/image";

interface AttractionCardProps {
  img: string;
  title: string;
  link: string;
  paragraph: string;
}

function AttractionCard(children: AttractionCardProps) {
  return (
    <div className="relative w-full">
      <Image
        src={children.img}
        alt={children.title}
        width={200}
        height={100}
        className="w-full object-cover"
      />
      <div className="absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
      <div className="absolute bottom-0 z-20 p-4 text-left text-white">
        <h4 className="font-semibold text-xl">{children.title}</h4>
        <hr />
        <p className="font-medium text-sm">{children.paragraph}</p>
        <a href="Read More"></a>
      </div>
    </div>
  );
}

export default AttractionCard;
