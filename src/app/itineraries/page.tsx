"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ItineraryWrapper from "./ItineraryWrapper";
import ItinerariesWrapper from "./ItinerariesWrapper";

function ItineraryContent() {
  const searchParams = useSearchParams();

  const country = searchParams.get("country") ?? "";
  const category = searchParams.get("category") ?? "";
  const packageSlug = searchParams.get("packageSlug") ?? "";

  return (
    <>
      <ItineraryWrapper
        country={country}
        category={category}
        packageSlug={packageSlug}
      />

      <ItinerariesWrapper
        country={country}
        category_slug={category}
      />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading itineraries...</div>}>
      <ItineraryContent />
    </Suspense>
  );
}
