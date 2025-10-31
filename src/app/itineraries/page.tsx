import ItineraryWrapper from "./ItineraryWrapper";

interface ItineraryPageProps {
  params: {
    slug: string[]; // catch-all route
  };
}

export default function ItineraryPage({ params }: ItineraryPageProps) {
  const [country, category, packageSlug = ""] = params.slug;

  return <ItineraryWrapper country={country} category={category} packageSlug={packageSlug} />;
}
