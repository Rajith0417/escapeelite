"use client";
import TourMap from "./TourMap";
import ItineraryTabs, { type TabItem } from "./ItineraryTabs";
import ItineraryDayCard from "./ItineraryDayCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export interface Itinerary {
  group_id: number
  days: number[]
  cities: string[]
  options: Option[]
}

export interface Option {
  option_id: number
  description: string
  over_night_stay: string
  images: string[]
  attractions: Attraction[]
  transport_options: TransportOption[]
  accommodations: accommodations
}

export interface accommodations {
  "2": hotelDetails[]
  "3": hotelDetails[]
  "4": hotelDetails[]
}

export interface hotelDetails {
  name: string
  category_id: number
  hotel_id: number
  slug: string
}

// export interface Image2 {
//   itinerary_image_path: string
// }

export interface Attraction {
  attraction_detail_id: number
  attraction_detail_heading: string
  attraction_detail_description: string
  attraction_detail_image_path: string
}

export interface TransportOption {
  transportation_name: string
  transportation_logo: string
  transportation_image: string
  transportation_description: string
  transfer_time?: string
  include_in_price?: number
  show_to_front?: number
}

interface ItinerarySectionProps {
  itineraries?: Itinerary[];
  mapData?: string;
}

export default function ItinerarySection({ itineraries, mapData }: ItinerarySectionProps) {

  const tabs: TabItem[] = [
    {
      id: "map",
      title: "Tour Map",
      content: (
        <div className="py-4">
          {/* <TourMap
            markers={[
              { lat: 6.9271, lng: 79.8612 },
              { lat: 7.957, lng: 80.7603 },
            ]}
          /> */}
          <iframe
            src={mapData}
            width="800" height="450" loading="lazy"
            title="Itinerary map"></iframe>
        </div>
      ),
    },
    {
      id: "itinerary",
      title: "Itinerary",
      content: (
        <>
          <div className="hidden md:block space-y-4">
            {itineraries && itineraries.map((itinerary, index)=>(
              <ItineraryDayCard 
                key={index} 
                dayNumber={itinerary.days} 
                city={itinerary.cities} 
                options={itinerary.options}
              />
            ))}
          </div>
          <div className="block md:hidden space-y-4">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {itineraries && itineraries.map((itinerary, index)=>(
                <SwiperSlide key={index}>
                  <ItineraryDayCard key={index} dayNumber={itinerary.days} city={itinerary.cities} options={itinerary.options}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ),
    },
    {
      id: "fineprint",
      title: "Fine Print",
      content: (
        <section className="w-full mt-14">
          {/* Two column section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Includes */}
            <div className="">
              <h3 className="bg-blue-50 rounded-lg p-5 text-xl font-semibold mb-4">
                The price includes
              </h3>
              <ul className="space-y-3 font-medium text-base">
                <li className="border-b border-gray-200 pt-4 pr-5 pb-[30px] pl-5">
                  All Taxes
                </li>
                <li className="border-b border-gray-200 pt-4 pr-5 pb-[30px] pl-5">
                  Accommodation in the room category specified
                </li>
                <li className="border-b border-gray-200 pt-4 pr-5 pb-[30px] pl-5">
                  Meals as specified in the itinerary
                </li>
                <li className="border-b border-gray-200 pt-4 pr-5 pb-[30px] pl-5">
                  New years eve Gala Dinner / Christmas eve Gala Dinner
                </li>
                <li className="border-b border-gray-200 pt-4 pr-5 pb-[30px] pl-5">
                  Personal vehicle &amp; an English speaking associate (driver)
                  throughout the stay
                </li>
                <li className=" pt-4 pr-5 pb-[30px] pl-5">
                  A dedicated travel manager
                </li>
              </ul>
            </div>

            {/* Excludes */}
            <div className="font-inter">
              <h3 className="bg-blue-50 rounded-lg p-5 text-xl font-semibold mb-4">
                The price excludes:
              </h3>
              <ul className="space-y-3 font-medium text-base">
                <li className="border-b border-gray-200 pt-4 pr-5 pb-[30px] pl-5">
                  Expenses of personal nature
                </li>
                <li className="border-b border-gray-200 pt-4 pr-5 pb-[30px] pl-5">
                  Tips and porterage – should be given at your discretion
                </li>
                <li className="border-b border-gray-200 pt-4 pr-5 pb-[30px] pl-5">
                  Visa processing and visa application fees
                </li>
                <li className="border-b border-gray-200 pt-4 pr-5 pb-[30px] pl-5">
                  Seaplanes and domestic flights
                </li>
                <li className=" pt-4 pr-5 pb-[30px] pl-5">Travel insurance</li>
              </ul>
            </div>
          </div>

          {/* Travel Insurance Note */}
          <div className="mt-10">
            <h3 className="bg-blue-50 rounded-lg p-5 text-xl font-semibold mb-3">
              Travel Insurance
            </h3>
            <p className=" text-base font-medium leading-relaxed pt-4 pr-5 pb-[30px] pl-5">
              Your holiday itinerary with Escape Elite does NOT include travel
              insurance and it is your responsibility to ensure you have
              adequate insurance cover. In accordance with normal industry
              practice, we will require you to have adequate travel insurance to
              provide accident and medical cover before your holiday departs.
              Such insurance should ideally be valid from the date of booking,
              be valid throughout the holiday duration and financially cover any
              probable loss through cancellation, amendment, accident or health
              related problems. You should ensure you are covered for all
              activities you are planning on your trip.
            </p>
          </div>
        </section>
      ),
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-5">
        <ItineraryTabs tabs={tabs} />
      </div>
    </section>
  );
}
