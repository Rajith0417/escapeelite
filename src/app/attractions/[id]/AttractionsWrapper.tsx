// src/app/attractions/[id]/AttractionsWrapper.tsx

"use client";

import Hero from "@/components/Hero";
import ImageLeftRightSection from "@/components/ImageLeftRightSection";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchAttractionsDetails } from "../../../../store/slices/attractionsDetails"; // Ensure this path is correct

interface AttractionPageProps {
  params: { id: string };
}

// const imageBaseUrl = "https://www.escapeelite.com/admin/assets/images/attraction_images/";
// const fallbackImage = "https://www.escapeelite.com/admin/assets/img/faces/face-0.jpg";
/**
 * Client Component responsible for Redux state management and data fetching.
 */
export default function AttractionsWrapper({ params }: AttractionPageProps) {
  const id = params.id;
  const dispatch = useAppDispatch();
  
  // Use a different name (apiResponse) for clarity, as the Redux state holds the raw API JSON structure.
  const { data: apiResponse, status, error } = useAppSelector((state) => state.attractionsDetails);
  
  // The Redux thunk returns data.data, so apiResponse should be the object with properties like 'heading'.
  // If your thunk returned the WHOLE API object, you would use apiResponse.data here.
  // Based on your slice: state.data = action.payload (which is data.data)
  const attractionData = apiResponse;

  useEffect(() => {
    // Only dispatch if the ID is available and you aren't already loading/succeeded
    if (id && status === "idle") {
      dispatch(fetchAttractionsDetails(id));
    }
  }, [dispatch, id, status]); // Added 'id' and 'status' to dependency array

  useEffect(() => {
    if (id) {
      // ⚠️ IMPORTANT: If you want to show "Loading..." immediately on link click, 
      // you must add a Redux action to reset 'status' to 'idle' or 'loading'
      // before dispatching the new fetch.
      
      // For now, let's just rely on the new dispatch
      dispatch(fetchAttractionsDetails(id));
    }
  }, [dispatch, id]); 

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // This should now log the correct properties if data is available
  console.log("wrapper");
  console.log("Redux Data State:", attractionData);
  console.log("Heading:", attractionData?.heading);

  // If attractionData is null, return early to prevent errors
  if (!attractionData) return <p>No attraction details found.</p>;
  
  return (
    <>
      <Hero
        image={attractionData.image}
        // Access properties directly from attractionData
        titleDesktop={attractionData.heading} 
        titleMobile={attractionData.heading}
        paragraph={attractionData.description}
      />
      {/* <h1 className="text-2xl font-bold">Attraction ID: {id}</h1> */}

      
      {/* Assuming your ImageLeftRightSection expects the full attractionData object, 
        you can uncomment the line below.
      */}
      {attractionData.details && <ImageLeftRightSection contents={attractionData.details} />}
    </>
  );
}
