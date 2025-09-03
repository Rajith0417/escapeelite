import ChatbotPage from '@/components/ChatbotPage';
import Hero from '@/components/Hero';
import ItinerarySection from '@/components/ItinerarySection';

interface HotelPageProps {
  params: Promise<{ id: string }>; // 👈 async in Next.js 15
}

// Required for "output: export"
export async function generateStaticParams() {
  // Normally you'd fetch from API / DB
  const hotelIds = ['1', '2', '3'];

  return hotelIds.map((id) => ({
    id,
  }));
}

export default async function HotelPage({ params }: HotelPageProps) {
  const { id } = await params; // 👈 must await

  return (
    <>
      <Hero
        image={'banners/image12.png'}
        titleDesktop="Heritance Kandalama"
        titleMobile="Heritance Kandalama"
        rating={3}
      />
      <section>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              <h1 className="text-2xl font-bold">Hotel ID: {id}</h1>
            </div>
            <div>
              <ChatbotPage />
            </div>
          </div>
        </div>
      </section>
      <ItinerarySection />
    </>
  );
}
