import Hero from "@/components/Hero";
import ImageLeftRightSection from "@/components/ImageLeftRightSection";
// import ItinerarySection from '@/components/ItinerarySection';
// import SelectedHotelTabSection from '@/components/SelectedHotelTabSection';

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
        image={`${basePath}/banners/image3.png`}
        titleDesktop="Unesco World Heritage Sites"
        titleMobile="Unesco World Heritage Sites"
        paragraph="There are eight fabulous locations in Sri Lanka that are considered by UNESCO to be sites of world heritage. These sites are to be preserved."
      />
      <ImageLeftRightSection />
    </>
  );
}
