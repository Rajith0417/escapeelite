import React from 'react'
import ItineraryTabs from './ItineraryTabs'
import { TabItem } from './ItineraryInnerTabs'
import parse from 'html-react-parser';
import TourMap from './TourMap';
import Image from "next/image";

interface itineraryHotelProps {
  name: string;
  star: number;
  photos: string[];
  video: string;
  facilities: string;
  map: Location;
}

interface Location {
  latitude: number;
  longitude: number;
}

function ItineraryHotel({ name, star, photos, video, facilities, map }: itineraryHotelProps) {
  const tabs: TabItem[] = [
    {
      id: "photo",
      title: "Photo Gallery",
      content: (
        <div className="w-full text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {photos?.slice(0, 12).map((img, i) => (
            <div key={i} className="relative w-full h-32">
              <Image
                src={img}
                alt={name}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "video",
      title: "Video",
      content: (
        <div className="w-full text-center flex justify-center mt-6">
          <iframe
            width="560"
            height="315"
            src={video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mx-5 w-3/4 rounded-2xl"
          />
        </div>
      ),
    },
    {
      id: "facilities",
      title: "Facilities",
      content: (
        <>
          <p>{facilities}</p>
        </>
      ),
    },
    {
      id: "map",
      title: "Map",
      content: (
        <div className="py-4 mt-6">
          <TourMap
            markers={[
              map!,
            ]}
          />
        </div>
      ),
    },
  ]
  return (
    <section className="">
      <div className="flex gap-5 justify-baseline">
        <h2 className='text-3xl font-semibold'>{name}</h2>
        {star && (<div className="flex items-center mb-5">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-6 h-6 ${star !== undefined && index < star ? "text-yellow-400" : "text-gray-300"
                }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        )}
      </div>

      <div className="container mx-auto px-5">
        <ItineraryTabs tabs={tabs} />
      </div>
    </section>
  )
}

export default ItineraryHotel
