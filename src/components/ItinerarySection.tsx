"use client";
import TourMap from "./TourMap";
import ItineraryTabs, { type TabItem } from "./ItineraryTabs";
import ItineraryDayCard from "./ItineraryDayCard";

export default function ItinerarySection() {
  const days = [
    {
      dayNumber: 1,
      city: "COLOMBO",
      imageSrc: "/banners/image10.png",
      attractions: [
        "Gangaramaya Buddhist Temple",
        "Independence Square",
        "Shopping in Colombo",
      ],
      accommodation: {
        Superior: ["Ramada Colombo", "Global Towers", "Cinnamon Red Colombo"],
        Deluxe: ["Galle Face Hotel", "The Kingsbury", "Marineo Beach"],
        Luxury: ["Uga Residence", "Tintagel", "Jetwing Colombo 7"],
      },
      transportation: [
        {
          title: "Personal vehicle & driver",
          subtitle: "Transfer: 35 minutes",
          note: "INCLUDED IN PRICE",
          included: true,
        },
      ],
    },
    {
      dayNumber: 2,
      city: "SIGIRIYA",
      imageSrc: "/banners/image7.png",
      attractions: [
        "Sacred city of Anuradhapura",
        "Sigiriya Rock Fortress",
        "Ancient City of Polonnaruwa",
        "Pidurangala Monastery",
      ],
      accommodation: {
        Superior: ["Ramada Colombo", "Global Towers", "Cinnamon Red Colombo"],
        Deluxe: ["Galle Face Hotel", "The Kingsbury", "Marineo Beach"],
        Luxury: ["Uga Residence", "Tintagel", "Jetwing Colombo 7"],
      },
      transportation: [
        {
          title: "Personal vehicle & driver",
          subtitle: "Transfer: 3.5 hours",
          note: "INCLUDED IN PRICE",
          included: true,
        },
        {
          title: "Sea Plane / Air Taxi",
          subtitle: "Transfer: 35 minutes",
          note: "EXCLUDED IN PRICE",
          included: false,
        },
      ],
    },
  ];

  const tabs: TabItem[] = [
    {
      id: "map",
      title: "Tour Map",
      content: (
        <div className="py-4">
          <TourMap markers={[{ lat: 6.9271, lng: 79.8612 }, { lat: 7.9570, lng: 80.7603 }]} />
        </div>
      ),
    },
    {
      id: "itinerary",
      title: "Itinerary",
      content: (
        <div className="space-y-4">
          {days.map((d) => (
            <ItineraryDayCard key={d.dayNumber} {...d} />
          ))}
        </div>
      ),
    },
    {
      id: "fineprint",
      title: "Fine Print",
      content: (
        <div className="rounded-xl ring-1 ring-gray-200 bg-white p-6 text-sm text-gray-700">
          <p className="mb-3 font-semibold">Important Notes</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>All timings are approximate and subject to local conditions.</li>
            <li>Accommodation is subject to availability; comparable alternatives may be provided.</li>
            <li>Some experiences may be weather dependent.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-5 md:px-0">
        <ItineraryTabs tabs={tabs} />
      </div>
    </section>
  );
}
