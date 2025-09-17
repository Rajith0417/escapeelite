// import ChatbotPage from '@/components/ChatbotPage';
import Facilities from '@/components/Facilities';
import Hero from '@/components/Hero';
import ImageGallery from '@/components/ImageGallery';
// import ItinerarySection from '@/components/ItinerarySection';
import SelectedHotelTabSection from '@/components/SelectedHotelTabSection';
import Chatbot from '@/components/Chatbot';

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

  const categories = [
    {
      label: "OUTDOORS",
      facilities: ["Outdoor fireplace","Picnic area","BBQ facilities (Additional charge)", "Sun terrace", "Terrace", "Garden"]
    },
    {
      label: "INDOORS",
      facilities: ["2Outdoor fireplace","2Picnic area","BBQ facilities (Additional charge)", "Sun terrace", "Terrace", "Garden"]
    }
  ]

  return (
    <>
      <Hero
        image={'/banners/image12.png'}
        titleDesktop="Heritance Kandalama"
        titleMobile="Heritance Kandalama"
        rating={3}
        fullScreen={false}
      />
      <section className='py-16'>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              <h1 className="text-2xl font-bold">Hotel ID: {id}</h1>
              <ImageGallery/>
            </div>
            <div>
              <Chatbot chatbotId={'b91db0d7-e9b2-4432-bc19-0c90f894f407'} />
            </div>
          </div>
        </div>
      </section>
      <section className='py-16'>
        <div className="container mx-auto px-4">
          <div className="grid grid-col-1 md:grid-cols-5 gap-10 items-start">
            <div className="col-span-1 md:col-span-3">
              <SelectedHotelTabSection/>
            </div>
            <div className="col-span-1 md:col-span-2">
              <Facilities title={'Facilities'} categories={categories}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
