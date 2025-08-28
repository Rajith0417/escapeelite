"use client";

interface Marker {
  lat: number;
  lng: number;
  label?: string;
}

interface TourMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  // For simplicity we render an embed centered around the first marker
  markers?: Marker[];
  className?: string;
}

export default function TourMap({
  center = { lat: 6.9271, lng: 79.8612 }, // Colombo
  zoom = 7,
  markers = [],
  className = "",
}: TourMapProps) {
  const mapCenter = markers[0] ? markers[0] : center;
  const q = `${mapCenter.lat},${mapCenter.lng}`;
  const src = `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&output=embed`;

  return (
    <div className={`w-full h-[360px] md:h-[480px] rounded-xl overflow-hidden ring-1 ring-black/5 ${className}`}>
      <iframe
        title="Tour Map"
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
