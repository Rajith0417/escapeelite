import React from 'react'
import Image from "next/image";

interface ImageLeftRightProps {
    img: string,
    alt: string,
    title: string,
    paragraph: string,
    format: "left" | "right",
}

function ImageLeftRight({img, alt, title, paragraph, format}: ImageLeftRightProps) {
  return (
    <div className={`flex gap-6 items-center mb-8 flex-col ${format === "right" ? "md:flex-row" : "md:flex-row-reverse"} border border-[#ECEBEB] md:border-none rounded-lg md:rounded-none`}>
        <div className="relative w-full  md:w-1/2 xl:w-[624px] aspect-[12/7]">
        <Image
            src={img}
            alt={alt}
            fill
            className="object-cover"
        />
        </div>
        <div className='flex-1 p-4 md:p-0'>
            <h3 className='font-semibold text-[32px] mb-8 text-gray-900'>{title}</h3>
            <p className='text-base font-normal text-gray-700'>{paragraph}</p>
        </div>
    </div>
  )
}

export default ImageLeftRight
