"use client"

import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface AccommodationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  rating: number; // 1-5 stars
  tag?: string;
  onViewDetailsHref?: string;
}

export default function AccommodationCard({
  imageSrc,
  title,
  description,
  rating,
  tag = "Hotel & Resort",
  onViewDetailsHref = "#",
}: AccommodationCardProps) {
  return (
    <article className="m-0.5 md:m-0 flex flex-col justify-between rounded-3xl bg-white md:shadow-lg ring-1 ring-black/5 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image section with overlay tag */}
      <div className="relative w-full h-64 md:h-[276px]">
        <Image
          src={`${basePath}${imageSrc}`}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        
        {/* Overlay tag */}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-green-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg">
            {tag}
          </span>
        </div>
      </div>

      {/* Content section */}
      <div className="font-poppins p-6 flex-1 flex flex-col justify-between">
        {/* Star rating */}
        <div className="flex items-center mb-5">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="flex-1 text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        {/* CTA link */}
        <div className="flex items-center justify-between">
          <a
            href={onViewDetailsHref}
            className="text-blue-400 text-xs hover:text-blue-500 transition-colors flex items-center gap-2"
          >
            Click to view details
            <Image src={`${basePath}/icons/arrowBlue.svg`} alt={""} width={12} height={12} className="block"/>
          </a>
        </div>
      </div>
    </article>
  );
}
