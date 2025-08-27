// components/InfoSection.tsx
import Image from "next/image";

export default function InfoSection() {
  return (
    <section className="py-16">
      <div className="container px-5 mx-auto flex flex-col-reverse items-center justify-between gap-6 md: md:px-auto md:flex-row">
        <div className="flex-1 text-gray-800 leading-relaxed uppercase text-xl font-normal tracking-wide text-center md:text-left">
          <p>
            We specialise in tailormade holidays to Sri Lanka, holidays to
            India, holidays to Maldives, holidays to Seychelles, holidays to
            Mauritius and many other destinations around the globe. We guarantee
            to offer the best prices, simply make your enquiry online or talk to
            one of our friendly travel experts to get your dream holiday
            tailored to your whims and fancies.
          </p>
        </div>
        <div className="flex-1 relative">
          <Image
            src="banners/image5.png"
            alt="Tea plantations"
            width={600}
            height={400}
            className="rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
