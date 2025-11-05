"use client";
import Image from "next/image";
import ItineraryInnerTabs, { TabItem } from "./ItineraryInnerTabs";
import Popup from "./Popup";
import Pill from "./Pill";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../..//store"; // <-- adjust paths to your store
import { fetchHotelDetails } from "../../store/slices/hotelDetails";
import ItineraryHotel from "./ItineraryHotel";

interface ItineraryDayCardProps {
  dayNumber: number[];
  city: string[];
  options: Option[];
}

export interface Option {
  option_id: number;
  description: string;
  over_night_stay: string;
  images: string[];
  attractions: Attraction[];
  transport_options: TransportOption[];
  accommodations: Accommodations;
}

export interface Accommodations {
  "2": HotelDetails[];
  "3": HotelDetails[];
  "4": HotelDetails[];
}

export interface HotelDetails {
  name: string;
  category_id: number;
  hotel_id: number;
  slug: string;
}

export interface Attraction {
  attraction_detail_id: number;
  attraction_detail_heading: string;
  attraction_detail_description: string;
  attraction_detail_image_path: string;
}

export interface TransportOption {
  transportation_name: string;
  transportation_logo: string;
  transportation_image: string;
  transportation_description: string;
  transfer_time?: string;
  include_in_price?: number;
  show_to_front?: number;
}

export default function ItineraryDayCard({
  dayNumber,
  city,
  options,
}: ItineraryDayCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: hotelData, status: hotelStatus } = useSelector(
    (state: RootState) => state.hotelDetails
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState<{
    title: string;
    description: string;
    image?: string;
  } | null>(null);
  const [selectedHotelSlug, setSelectedHotelSlug] = useState<string | null>(null);

  const handlePopupOpen = (title: string, description: string, image?: string) => {
    setPopupData({ title, description, image });
    setIsPopupOpen(true);
    setIsSecondPopupOpen(false);
  };

  const handleHotelClick = async (hotelSlug: string) => {
    setSelectedHotelSlug(hotelSlug);
    setIsPopupOpen(false);
    setIsSecondPopupOpen(true);

    // Dispatch Redux thunk to fetch hotel details
    // Assuming API expects slug, but if you have slug in hotel data use that.
    dispatch(fetchHotelDetails(String(hotelSlug)));
  };

  const innerTabsItems: TabItem[] = (["Superior", "Deluxe", "Luxury"] as const).map(
    (tier) => ({
      id: tier,
      title: tier,
      content: <div className="py-4 flex flex-col items-center gap-2"></div>,
    })
  );

  return (
    <article className="font-inter m-0.5 md:m-0 rounded-xl ring-1 ring-gray-200 bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 px-5 py-8">
        {/* Left image */}
        <div className="relative aspect-[4/3] md:aspect-auto md:h-[200px] rounded-lg overflow-hidden">
          <Image
            src={options[0].images[0]}
            alt={city[0]}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right content */}
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-wide px-2 py-1 rounded-md bg-gray-900 text-white">
              DAY {String(dayNumber).padStart(2, "0")}
            </span>
            <h3 className="text-lg md:text-2xl font-semibold text-gray-900">
              {city.join(", ")}
            </h3>
          </div>

          {/* Loop through options */}
          {options.map((option, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-7 gap-8 md:gap-4">
              {/* Attractions */}
              {option.attractions?.length > 0 && (
                <div className="col-span-1 lg:col-span-2">
                  <h4 className="text-base font-medium text-gray-800 mb-2 text-left">
                    Attractions
                  </h4>
                  <div className="flex flex-wrap gap-2 px-5 py-4 rounded-lg xl:ring-1 ring-gray-200 justify-center">
                    {option.attractions.map((a, i) => (
                      <div
                        key={i}
                        className="font-inter inline-block rounded-full bg-[#EFF7FF] font-medium px-3 py-1 text-xs text-gray-900 cursor-pointer"
                        onClick={() =>
                          handlePopupOpen(
                            a.attraction_detail_heading,
                            a.attraction_detail_description,
                            a.attraction_detail_image_path
                          )
                        }
                      >
                        {a.attraction_detail_heading}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accommodation */}
              {option.accommodations["2"]?.length > 0 && (
                <div className="col-span-1 lg:col-span-3 text-center">
                  <h4 className="text-base font-medium text-gray-800 mb-2 text-left">
                    Accommodation
                  </h4>
                  <div className="hidden lg:col-span-2 xl:grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(
                      [
                        { label: "Superior", key: "2" },
                        { label: "Deluxe", key: "3" },
                        { label: "Luxury", key: "4" },
                      ] as const
                    ).map(({ label, key }) => (
                      <div key={label} className="rounded-lg ring-1 ring-gray-200 p-2">
                        <div className="text-center text-[14px] font-medium text-blue-400 mb-2">
                          {label}
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          {option.accommodations[key]?.map((hotel, idx) => (
                            <Pill
                              key={idx}
                              onClick={() => handleHotelClick(hotel.slug)}
                            >
                              {hotel.name}
                            </Pill>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="block xl:hidden">
                    <ItineraryInnerTabs tabs={innerTabsItems} />
                  </div>
                </div>
              )}

              {/* Transportation */}
              {option.transport_options?.length > 0 && (
                <div className="col-span-1 lg:col-span-2">
                  <h4 className="text-base font-medium text-gray-800 mb-2 text-left">
                    Transportation
                  </h4>
                  <div className="space-y-3 flex flex-col rounded-lg xl:ring-1 ring-gray-200">
                    {option.transport_options.map((t, i) => (
                      <div
                        key={i}
                        className="p-3 flex items-start gap-3 cursor-pointer hover:bg-gray-50"
                        onClick={() =>
                          handlePopupOpen(
                            t.transportation_name,
                            t.transportation_description,
                            t.transportation_image
                          )
                        }
                      >
                        <div className="shrink-0 mt-0.5 w-12 h-12 flex justify-center items-center bg-[#EFF7FF] rounded-full">
                          <Image
                            src={t.transportation_logo}
                            alt={t.transportation_name}
                            width={30}
                            height={30}
                          />
                        </div>
                        <div className="text-xs text-gray-700">
                          <div className="font-semibold">{t.transportation_name}</div>
                          {t.transfer_time && (
                            <div className="text-gray-500">{t.transfer_time}</div>
                          )}
                          {t.transportation_description && (
                            <div className="text-[10px] text-blue-400">
                              {t.include_in_price == 1 ? (
                                <span>(INCLUDED IN PRICE)</span>
                              ) : (
                                <span>(EXCLUDED FROM PRICE)</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Popup for Attractions / Transport */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        {popupData && (
          <div className="text-center">
            <h2 className="text-left text-xl font-bold mb-3">{popupData.title}</h2>
            <div className="flex gap-5 items-center">
              {popupData.image && (
                <div className="w-1/3 h-48 relative mb-3">
                  <Image
                    src={popupData.image}
                    alt={popupData.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <p className="text-gray-700 w-2/3 text-left">{popupData.description}</p>
            </div>
          </div>
        )}
      </Popup>

      {/* Secondary popup for hotel details */}
      <Popup isOpen={isSecondPopupOpen} onClose={() => setIsSecondPopupOpen(false)}>
        {hotelStatus === "loading" && <p>Loading hotel details...</p>}
        {hotelStatus === "failed" && <p>Failed to load hotel details.</p>}
        {hotelStatus === "succeeded" && hotelData && (
          
          <div>
            {/* <h2 className="text-xl font-bold mb-2">{hotelData.name}</h2>
            <p className="text-sm text-gray-600 mb-3">{hotelData.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              ⭐ {hotelData.star_rating} Star Hotel
            </p>
            <div className="grid grid-cols-2 gap-2">
              {hotelData.images?.slice(0, 4).map((img, i) => (
                <div key={i} className="relative w-full h-32">
                  <Image
                    src={img}
                    alt={hotelData.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div> */}
            <ItineraryHotel 
              name={hotelData.name} 
              star={hotelData.star_rating} 
              photos={hotelData.images} 
              video={hotelData.youtube_url_id} 
              facilities={hotelData.facilities_html} 
              map={hotelData.location}/>
          </div>
        )}
      </Popup>
    </article>
  );
}
