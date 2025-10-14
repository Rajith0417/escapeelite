// src/app/attractions/[id]/page.tsx

import AttractionsWrapper from "./AttractionsWrapper";

// Ensure the page is dynamically rendered to correctly resolve params.
// This is crucial for avoiding the "sync dynamic APIs" error
export const dynamic = 'force-dynamic';

// Next.js 14+ sometimes requires 'params' to be awaited in the App Router
interface PageProps {
  // params is typed as a Promise to handle the required await
  params: Promise<{ id: string }>; 
}

/**
 * The main page component for a dynamic attraction route.
 * This is a Server Component.
 */
export default async function AttractionPage({ params }: PageProps) {
  
  // Await the params to safely destructure the 'id'
  const { id } = await params; 

  // Pass the resolved 'id' to the Client Component
  return (
    <>
      {/* The Client Component handles Redux and useEffect for data fetching.
        It's wrapped in a conditional render just in case, though 'id' should always exist here.
      */}
      {id && <AttractionsWrapper params={{ id: id }} />}
      
      {/* You can uncomment your original static content here if needed, 
        but ensure the Redux fetching in the wrapper is correct.
      */}
      {/* <Hero
        image={`/banners/image3.png`}
        titleDesktop="Unesco World Heritage Sites"
        titleMobile="Unesco World Heritage Sites"
        paragraph="There are eight fabulous locations in Sri Lanka that are considered by UNESCO to be sites of world heritage. These sites are to be preserved."
      /> */}
    </>
  );
}
