import React, { useState } from "react";
import Image from "next/image";

const fallbackImage = process.env.NEXT_PUBLIC_FALLBACK_IMAGE || "";

interface QuoteProps {
  image: string;
  text: string;
  name: string;
  location: string;
}

function Quote({ image, text, name, location }: QuoteProps) {
  // ✅ Use full image path safely
  const [imgSrc, setImgSrc] = useState(
    image ? image : fallbackImage
  );

  return (
    <div className="font-inter bg-white text-black flex mx-0 flex-row gap-2 pr-3 md:pr-12 relative border-solid border-2 border-[#5E95CD] rounded-[50px] py-5 pl-3">
      {/* Quote icon */}
      <div className="w-[60px] h-[60px] overflow-hidden flex-shrink-0">
        <Image
          src={`/icons/quote.svg`}
          alt="quote"
          width={66}
          height={60}
          className="w-[60px] h-[60px] object-contain"
        />
      </div>

      {/* Quote text */}
      <p className="text-left line-clamp-5">{text}</p>

      {/* Author info */}
      <div className="text-white absolute right-0 -bottom-[50px] p-2 pr-8 gap-5 bg-blue-400 rounded-[50px] flex items-center flex-row">
        <div className="relative rounded-full w-14 h-14 overflow-hidden">
          <Image
            src={imgSrc}
            alt={`${name} testimonial`}
            fill
            className="object-cover"
            onError={() => setImgSrc(fallbackImage)}
          />
        </div>

        <div>
          <p>{name}</p>
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
}

export default Quote;
