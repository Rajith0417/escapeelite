import React from "react";
import Image from "next/image";

interface HolidayCardProps {
  img: string;
  title: string;
  location: string;
}

function HolidayCard({img, title, location}: HolidayCardProps) {
  return (
    <>
      <div className="rounded-xl absolute top-0 z-10 w-full h-full bg-gradient-to-b from-[transparent] via-[#000000_30%] to-[#000000]"></div>
      <Image
        src={img}
        alt="Tea plantations"
        layout="fill"
        objectFit="cover"
        className="rounded-xl"
      />
      <div className="z-20 absolute bottom-5 text-center w-full text-black">
        <div className="flex flex-row justify-center text-xl">
          <p className="mr-4">{title}</p>
          <a href="">
            <Image
              src="/icons/arrow.svg"
              alt=""
              width={24}
              height={24}
              className=""
            />
          </a>
        </div>
        <p>{location}</p>
      </div>
    </>
  );
}

export default HolidayCard;
