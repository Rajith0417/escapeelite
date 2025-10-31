import ItineraryWrapper from "./ItineraryWrapper";

interface ItineraryPageProps {
  searchParams: { 
    country: string; 
    packageSlug: string;
    category: string; 
  };
}


// export async function generateStaticParams() {
//   const hotelIds = ["1", "2", "3"];
//   return hotelIds.map((id) => ({ id }));
// }

export default async function ItineraryPage({ searchParams }: ItineraryPageProps) {
  const { country, packageSlug, category } = searchParams;

  return <ItineraryWrapper country={country} category={category} packageSlug={packageSlug} />;
}
