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
    <div className={`flex gap-6 items-center mb-8 ${format === "right" ? "flex-row" : "flex-row-reverse"}`}>
        <div className="relative w-[624px] h-[370px]">
        <Image
            src={img}
            alt={alt}
            fill
            className="object-cover"
        />
        </div>
        <div className='flex-1'>
            <h3 className='font-semibold text-[32px] mb-8 text-gray-900'>{title}</h3>
            <p className='text-base font-normal text-gray-700'>{paragraph}</p>
        </div>
    </div>
  )
}

export default ImageLeftRight
