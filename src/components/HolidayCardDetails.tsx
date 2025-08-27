"use client";
import Image from "next/image";

interface HolidayCardDetailsProps {
  imageSrc: string;
  title: string;
  description: string;
  duration: string;    // e.g., "12 days"
  season: string;      // e.g., "Jan-Jun | Oct-Dec"
  price: string;       // e.g., "£1,440.00"
  onViewMoreHref?: string;
}

export default function HolidayCardDetails({
  imageSrc,
  title,
  description,
  duration,
  season,
  price,
  onViewMoreHref = "#",
}: HolidayCardDetailsProps) {
  return (
    <article className="flex flex-col h-full rounded-3xl bg-white shadow-md ring-1 ring-black/5 overflow-hidden">
      {/* Top image - fixed height */}
      <div className="relative w-full h-64 md:h-72 flex-shrink-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover rounded-t-3xl"
        />
      </div>

      {/* Content - flex to fill remaining space */}
      <div className="flex flex-col flex-1 p-6 md:p-7">
        {/* Title - fixed height with line clamp */}
        <h3 className="text-[22px] leading-7 md:text-2xl font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>
        
        {/* Description - fixed height with line clamp */}
        <p className="text-gray-600 leading-6 mb-5 md:mb-6 line-clamp-3 min-h-[4.5rem] flex-shrink-0">
          {description}
        </p>

        {/* Meta row - fixed height */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-700 text-[15px] mb-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Image src="/icons/ten.svg" alt="duration" width={18} height={18} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/icons/tag.svg" alt="season" width={18} height={18} />
            <span>{season}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/icons/car.svg" alt="price" width={18} height={18} />
            <span className="font-semibold">{price}</span>
            <span className="text-gray-500 text-sm">(Per person)</span>
          </div>
        </div>

        {/* CTA - push to bottom */}
        <div className="mt-auto">
          <a
            href={onViewMoreHref}
            className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 text-white py-3.5 px-5 text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            View More
          </a>
        </div>
      </div>
    </article>
  );
}
