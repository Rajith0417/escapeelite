import React from "react";
import Image from "next/image";

const moreDetails = [
  {
    icon: "icons/sl.svg",
    title: "We do not outsource",
    more: "Our own operation in Sri Lanka",
  },
  {
    icon: "icons/ten.svg",
    title: "Over 10 year of experience",
    more: "A dedicated travel manager",
  },
  {
    icon: "icons/tag.svg",
    title: "We do not outsource",
    more: "Instant quote online",
  },
  {
    icon: "icons/car.svg",
    title: "Personal Vehicle",
    more: "English speaking driving associates",
  },
];

export default function MoreDetails() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-5 md:px-0 flex flex-col gap-10 md:flex-row  md:gap-16 md:mx-auto md:justify-between">
        {moreDetails.map((s, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <Image
              src={s.icon}
              alt=""
              width={84}
              height={84}
              className="h-20 mb-6"
            />
            <p className="font-extrabold text-2xl">{s.title}</p>
            <p className="font-medium text-xl">{s.more}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
