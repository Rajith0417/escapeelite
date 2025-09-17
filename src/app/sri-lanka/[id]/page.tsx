import Chatbot from "@/components/Chatbot";
import Hero from "@/components/Hero";
import ImageGallery from "@/components/ImageGallery";
import ItinerarySection from "@/components/ItinerarySection";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface HotelPageProps {
    params: Promise<{ id: string }>; // 👈 async in Next.js 15
}

// Required for "output: export"
export async function generateStaticParams() {
    // Normally you'd fetch from API / DB
    const hotelIds = ["1", "2", "3"];

    return hotelIds.map((id) => ({
        id,
    }));
}

export default async function HotelPage({ params }: HotelPageProps) {
    const { id } = await params; // 👈 must await

    return (
        <>
            <Hero
                image={`/banners/image2.png`}
                titleDesktop="Nature & Wildlife Tours"
                titleMobile="Nature & Wildlife Tours"
            />
            <section className='py-16'>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="w-full">
                            <ImageGallery/>
                        </div>
                        <div className="w-full">
                            <Chatbot chatbotId={"cda93067-397c-404b-8130-c2e68c403508"}/>
                        </div>
                    </div>
                </div>
            </section>
            <ItinerarySection/>
        </>
    );
}
