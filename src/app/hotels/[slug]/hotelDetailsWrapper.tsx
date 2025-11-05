'use client';
import Facilities from '@/components/Facilities';
import Hero from '@/components/Hero';
import ImageGallery from '@/components/ImageGallery';
import SelectedHotelTabSection from '@/components/SelectedHotelTabSection';
import ChatbotWrapper from '@/components/chatbot/ChatbotWrapper';

import { useEffect } from "react";
// NOTE: Make sure the paths to your Redux hooks/slices are correct
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"; 
import { fetchHotelDetails } from "../../../../store/slices/hotelDetails"; 
import { log } from 'util';
import TripAdvisorWidget from '@/components/TripSdvisorWidget';

interface HotelDetailsWrapperProps {
    params: { slug: string };
    // Example for receiving server data:
    // serverCategories?: { label: string; facilities: string[] }[];
}

export default function HotelDetailsClientWrapper({ params /*, serverCategories*/ }: HotelDetailsWrapperProps) {
    const slug: string = params.slug;
    console.log("Client Component: Slug received: " + slug);
    
    // 1. Hooks MUST be used inside this client component
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector((state) => state.hotelDetails);
    // console.log("---- hotel details wrapper");
    // console.log(data);
    

    // 2. Lifecycle hooks run here
    useEffect(() => {
        // This hook is fine to run here, it fetches data upon component mount
        dispatch(fetchHotelDetails(slug)); 
    }, [dispatch, slug]); // dependency array is correct (slug instead of params)

    // 3. Conditional rendering based on Redux status
    if (status === "loading") {
        // Basic loading indicator for the content that depends on Redux
        return (
            <section className='py-16 text-center text-xl font-semibold text-gray-600'>
                <p>Loading Testimonials data...</p>
            </section>
        );
    }

    if (status === "failed") {
        // Basic error indicator
        return (
            <section className='py-16 text-center text-xl font-semibold text-red-600'>
                <p>Error loading data: {error || "Unknown error"}</p>
            </section>
        );
    }

    // console.log("Client Component Data:", data);

    // 4. Render the full UI once data is ready
    return (
        <>
            <Hero
                image={data?.images[0] ?? '/banners/image12.png'}
                titleDesktop={data?.name}
                titleMobile={data?.name}
                rating={data?.star_rating}
                fullScreen={false}
            />
            <section className='py-16'>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="w-full">
                            {/* Data from Server Component (slug) is available via props */}
                            {/* <h1 className="text-2xl font-bold">Hotel Slug: {params.slug}</h1> */}


                            <ImageGallery images={data?.images} />
                            <TripAdvisorWidget code={data?.tripadvisor_code ?? ""} />
                        </div>
                        <div>
                            <ChatbotWrapper chatbotId="b91db0d7-e9b2-4432-bc19-0c90f894f407" />
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-16'>
                <div className="container mx-auto px-4">
                    <div className="grid grid-col-1 md:grid-cols-5 gap-10 items-start">
                        <div className="col-span-1 md:col-span-3">
                            <SelectedHotelTabSection description={data?.description} video={data?.youtube_url_id} location={data?.location}/>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            {/* If you passed serverCategories, you could use them here: */}
                            {/* <Facilities title={'Facilities'} categories={serverCategories}/> */}
                            <Facilities facilities={data?.facilities_html}/>
                            {/* <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold mb-2">Testimonial Data Status</h3>
                                <p className="text-sm">Status: <span className="font-medium text-green-700">Success</span> (Fetched {data ? data.length : 0} items)</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
