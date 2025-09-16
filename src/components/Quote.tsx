import React from "react";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function Quote() {
  return (
    <div className="font-inter bg-white text-black flex mx-5 md:mx-0 flex-row gap-2 pr-12 relative border-solid border-2 border-[#5E95CD] rounded-[50px] py-5 pl-3">
      <div className="w-[60px] h-[60px] overflow-hidden flex-shrink-0">
        <Image
          src={`${basePath}/icons/quote.svg`}
          alt="quote"
          width={66}
          height={60}
          className="w-[60px] h-[60px] object-contain"
        />
      </div>

      <p className="text-left">
        Absolutely lovely holiday - I would go through them again as I was so
        well taken care of. Fabulous itinerary, people and service. Holiday of a
        lifetime, one I will never forget, for all the right reasons.”
      </p>
      <div className="text-white absolute right-0 -bottom-[50px] p-2 pr-8 gap-5 bg-blue-400 rounded-[50px] flex items-center flex-row">
        <Image
          src={`${basePath}/images/user.png`}
          alt="quote"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <p>Jacqueline Yawn</p>
          <p>London, UK</p>
        </div>
      </div>
    </div>
  );
}

export default Quote;
