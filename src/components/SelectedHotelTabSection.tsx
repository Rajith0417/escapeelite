import React from "react";
import ItineraryTabs, { TabItem } from "./ItineraryTabs";
import TourMap from "./TourMap";

export default function SelectedHotelTabSection() {
  const tabs: TabItem[] = [
    {
      id: "description",
      title: "Description",
      content: (
        <>
          <p className="font-normal text-lg mb-10 mt-6">
            Heritance Kandalama is an architectural masterpiece by Geoffrey
            Bawa, built overlooking the eighth wonder of the world - the rock
            fortress of Sigiriya. The hotel sits at the heart of the cultural
            triangle of Sri Lanka, close to five UNESCO World Heritage Sites.
            The unpaved road through the jungle gives no clue to what to expect
            - there are no views of the hotel on the horizon. Then suddenly, as
            you drive up a ramp, a cave-like entrance appears. And even as you
            step into another world of minimalist white pillars and cool curving
            corridors, enormous boulders intrude, and birdsong hangs in the air.
            The theme continues throughout the hotel. Heritance Kandalama is
            shaped like the outspread wings of a bird, following the line of the
            cliff from which it seems to emerge. The hotel is a staggering 1 km
            from end to end, and rises up seven floors, yet appears to be a
            perfectly natural extension of the mountainside. The flat roof and
            timber pillars support a screen of vegetation that attracts local
            wildlife.
          </p>
          <div className="w-full text-center flex justify-center">
            <video
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              controls
              // autoPlay
              loop
              muted
              className="mx-5 w-3/4 rounded-2xl"
            />
          </div>
          <div className="py-4 mt-20">
            <TourMap
              markers={[
                { lat: 6.9271, lng: 79.8612 },
                { lat: 7.957, lng: 80.7603 },
              ]}
            />
          </div>
        </>
      ),
    },
    {
      id: "video",
      title: "Video",
      content: (
        <div className="w-full text-center flex justify-center mt-6">
          <video
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            controls
            // autoPlay
            loop
            muted
            className="mx-5 w-3/4 rounded-2xl"
          />
        </div>
      ),
    },
    {
      id: "map",
      title: "Map",
      content: (
        <div className="py-4 mt-6">
          <TourMap
            markers={[
              { lat: 6.9271, lng: 79.8612 },
              { lat: 7.957, lng: 80.7603 },
            ]}
          />
        </div>
      ),
    },
  ];

  return <ItineraryTabs tabs={tabs} />;
}
