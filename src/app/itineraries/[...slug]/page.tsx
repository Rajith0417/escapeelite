import ItineraryWrapper from "../ItineraryWrapper";
import ItinerariesWrapper from "../ItinerariesWrapper";

interface ItineraryPageProps {
    params: StringArray;
}

interface StringArray {
    slug: string[];
}

export default function ItineraryPage({ params }: ItineraryPageProps) {
  const [country, category, packageSlug = ""] = params.slug;

  console.log(country, category, packageSlug);

  return (
    <div>
      {params.slug.length == 3 ? (
        <ItineraryWrapper
          country={country}
          category={category}
          packageSlug={packageSlug}
        />
      ) : (
        <ItinerariesWrapper 
            country={country} 
            category_slug={category}
        />
      )}
    </div>
  );
}
