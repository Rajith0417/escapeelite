import React from "react";
import ItineraryTabs, { TabItem } from "./ItineraryTabs";
import TourMap from "./TourMap";
import parse from 'html-react-parser';

interface TabSectionProps {
  description?: string;
  video?: string;
  location?: Location;
}

interface Location {
  latitude: number;
  longitude: number;
}

const getYouTubeEmbedUrl = (url: string | undefined): string => {
  if (!url) return "";

  let videoId: string | null = null;

  // 1️⃣ Match watch?v=VIDEO_ID
  let match = url.match(/v=([a-zA-Z0-9_-]+)/);
  if (match) videoId = match[1];

  // 2️⃣ Match youtu.be/VIDEO_ID
  if (!videoId) {
    match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (match) videoId = match[1];
  }

  // 3️⃣ Match embedVIDEO_ID (missing slash)
  if (!videoId) {
    match = url.match(/embed([a-zA-Z0-9_-]+)/);
    if (match) videoId = match[1];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};


export default function SelectedHotelTabSection({ description, video, location }: TabSectionProps) {
  // console.log("-0-0-0-");
  // console.log(video);

  const hasVideo = Boolean(video && video.trim() !== "");
  console.log("has video =" + hasVideo);

  const tunedUrl = getYouTubeEmbedUrl(video);
  console.log("tuned url");

  console.log(tunedUrl);

  const tabs: TabItem[] = [
    {
      id: "description",
      title: "Description",
      content: (
        <>
          <p className="font-normal text-lg mb-10 mt-6">
            {description && parse(description)}
          </p>
          {hasVideo && <div className="w-full text-center flex justify-center">
            <iframe src={tunedUrl} />
          </div>}
          <div className="py-4 mt-20">
            <TourMap
              markers={[
                location!,
              ]}
            />
          </div>
        </>
      ),
    },
    ...(hasVideo
      ? [
        {
          id: "video",
          title: "Video",
          content: (
            <div className="w-full text-center flex justify-center mt-6">
              <iframe
                width="560"
                height="315"
                src={tunedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="mx-5 w-3/4 rounded-2xl"
              />
            </div>
          ),
        },
      ]
      : []),
    {
      id: "map",
      title: "Map",
      content: (
        <div className="py-4 mt-6">
          <TourMap
            markers={[
              // { lat: 6.9271, lng: 79.8612 },
              location!,
              // { lat: 7.957, lng: 80.7603 },
            ]}
          />
        </div>
      ),
    },
  ];

  // 👇 If there's no video, set "description" as the initial tab
  return (
    <ItineraryTabs tabs={tabs} initialTabId={hasVideo ? "video" : "description"} />
  );
}
