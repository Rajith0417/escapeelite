import HotelDetailsClientWrapper from "./hotelDetailsWrapper";

// Define the correct, standard type for the Server Component props
interface HotelPageProps {
  // params is an object, not a Promise
  params: { slug: string };
}

// This remains an Async Server Component, running on the server for dynamic SSR
export default async function HotelPage({params,}: { params: Promise<{ slug: string }>;}) {
  const { slug } = await params;

  // Server-side data definition is fine here
  // NOTE: If you wanted to pass this to the Client component, you would pass it as a prop below.
  const categories = [
    {
      label: "OUTDOORS",
      facilities: [
        "Outdoor fireplace",
        "Picnic area",
        "BBQ facilities (Additional charge)",
        "Sun terrace",
        "Terrace",
        "Garden",
      ],
    },
    {
      label: "INDOORS",
      facilities: [
        "2Outdoor fireplace",
        "2Picnic area",
        "BBQ facilities (Additional charge)",
        "Sun terrace",
        "Terrace",
        "Garden",
      ],
    },
  ];
  // console.log("Server Component: Slug received:", slug);

  return (
    // Render the client component wrapper and pass the required data as props
    <HotelDetailsClientWrapper
      params={{ slug: slug }}
      // Example of passing server data if needed
      // serverCategories={categories}
    />
  );
}
