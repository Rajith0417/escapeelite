"use client"

import React, { useState } from "react";
import ImageLeftRight from "./ImageLeftRight";
import Pagination from "./Pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ImageLeftRightSection() {
  const [currentPage, setCurrentPage] = useState(1);

  const contents = [
    {
      image: "/images/anuradhapura.jpg",
      alt: "Sacred city of Anuradapura",
      title: "Sacred city of Anuradapura",
      paragraph:
        "Anuraadapura was 3rd capital of the kingdom of Rajarata after Tambapanni and Upatissa Nuwara. The city, now a UNESCO World Heritage Sites, was the center of Theravada Buddhism for many centuries. Anuradhapura is famous for its well preserved ruins of ancient Sri Lankan civilization. Many places of historical and archaeological interest could be visited. Sri Maha Bodhi ( Sacred Bo-Tree ) was brought as a sapling of the tree under which Prince Siddhartha attained to enlightenment and it is over 2200 years old and is the oldest historically documented tree in the world. Ruwanweliseya (2nd century B.C) is the most famous of all the Dagobas. It originally depicted the perfect 'bubble shape' that modern restoration has not been able to accurately reproduce. 'Samadhi' Buddha statue (4th century AD) is one of the most famous statues, depicting the Buddha in a state of 'Samadhi' or deep meditation Isurumuniya rock temple (3rd century B.C) is well known for its rock carvings",
    },
    {
      image: "/images/polonnaruwa.jpg",
      alt: "Ancient City of Polonnaruwa",
      title: "Ancient City of Polonnaruwa",
      paragraph:
        "Polonnaruwa, which was the 2nd capital city of Sri Lanka built in the 11th and 12th centuries AD, and which is a world heritage site. Here you can see the ruins of the Royal Palace, the Gal Viharaya where 4 splendid statues of the Buddha in 'Upright', 'Sedentary' and 'Recumbent' postures carved out of rock could be seen, the Audience Hall, the Lotus Bath, the statue of king Parakramabahu, and e Parakrama Samudraya - a lake built by King Parakramabahu the great. There are also monuments of famous places of worship such as the Shiva Temple, the Lankathilake, the Watadage, the Galpotha, the Kiri Vehera and the remains of a former Temple of the Tooth Relic.",
    },
    {
      image: "/images/sigiriya.jpg",
      alt: "Sigiriya Rock Fortress",
      title: "Sigiriya Rock Fortress",
      paragraph:
        "The story of Sigiriya rock fortress is the tale of King Kashyapa who ruled between 477-495 AD. It was the largest and most sophisticated single construction project ever undertaken in ancient Sri Lanka. The ruins of the Sigiriya rock fortress seen today are less than twenty percent of the structures that graced area. The 'Lion Rock' is a citadel of unusual beauty rising 200 meters from the scrub jungle. The rock was the innermost stronghold of the 70 hectare fortified town. A moat, rampart, and extensive gardens including the renowned water gardens ring the base of the rock. Visit the world renowned frescoes of the 'Heavenly Maidens' of Sigiriya, which are in a sheltered pocket of the rock approached by a spiral stairway. These frescoes are painted in earth pigments on plaster.",
    },
    {
      image: "/images/kandy.jpg",
      alt: "Sacred city of Kandy",
      title: "Sacred city of Kandy",
      paragraph:
        "Kandy was the last capital of the Sri Lankan kings and is a World Heritage Site. The name 'Kandy' conjures visions of splendor and magnificence. Many of the legends, traditions and folklore are still lovingly kept alive. Kandyan do many things for leisure and entertainment in the city and could be visited following places, The Temple of the Tooth Relic in Kandy Kandy Lake built by the last Sinhala king, Sri Wickrama Rajasinghe in 1798 Kandy town and bazaar, the arts and crafts centre, a gem museum and a lapidary Witness a cultural show.",
    },
    {
      image: "/images/dambulla.jpg",
      alt: "Golden Temple of Dambulla",
      title: "Golden Temple of Dambulla",
      paragraph:
        "It is a World Heritage Site. Galle which was once the chief port of Ceylon. It is still well known for hand-made lace. Important natural geographical features in Galle include Rumessala. Galle Fort in the bay of Galle on the southwest coast of Sri Lanka, (spanning 90 acres) was originally built by the Portuguese and later extended by the Dutch in 1663.",
    },
    {
      image: "/images/sinharaja.jpg",
      alt: "Sinharaja forest reserve",
      title: "Sinharaja forest reserve",
      paragraph:
        "Sinharaja Forest Reserve is a national park and a biodiversity hotspot in Sri Lanka. The reserve's name translates as Kingdom of the Lion.The reserve is only 21 km (13 mi) from east to west, and a maximum of 7 km (4.3 mi) from north to south, but it is a treasure trove of endemic species, including trees, insects, amphibians, reptiles, birds and mammals. Because of the dense vegetation, wildlife is not as easily seen as at dry-zone national parks such as Yala. There are about 3 elephants and the 15 or so leopards are rarely seen. The most common larger mammal is the endemic Purple-faced Langur. An interesting phenomenon is that birds tend to move in mixed feeding flocks, invariably led by the fearless Greater Racket-tailed Drongo and the noisy Orange-billed Babbler. Of Sri Lanka's 26 endemic birds, the 20 rainforest species all occur here, including the elusive Red-faced Malkoha, Green-billed Coucal and Sri Lanka Blue Magpie.",
    },
    {
      image: "/images/galle.jpg",
      alt: "Old town of Galle",
      title: "Old town of Galle",
      paragraph:
        "It is a World Heritage Site. Galle which was once the chief port of Ceylon. It is still well known for hand-made lace. Important natural geographical features in Galle include Rumessala. Galle Fort in the bay of Galle on the southwest coast of Sri Lanka, (spanning 90 acres) was originally built by the Portuguese and later extended by the Dutch in 1663.",
    },
    {
      image: "/images/highland.jpg",
      alt: "Central Highland of Sri Lanka",
      title: "Central Highland of Sri Lanka",
      paragraph:
        "The Central Highlands of Sri Lanka is a serial property comprising three component parts: Peak Wilderness Protected Area, Horton Plains National Park and Knuckles Conservation Forest. Its forests are globally important and provide habitat for an exceptional number of endemic species of flora and fauna. The property includes the largest and least disturbed remaining areas of the submontane and montane rain forests of Sri Lanka, which are a global conservation priority on many accounts. They include areas of Sri Lankan montane rain forests considered as a super-hotspot within the Western Ghats and Sri Lanka biodiversity hotspot. More than half of Sri Lanka's endemic vertebrates, half of the country's endemic flowering plants and more than 34% of its endemic trees, shrubs, and herbs are restricted to these diverse montane rain forests and adjoining grassland areas.",
    },
    {
      image: "/images/anuradhapura.jpg",
      alt: "Sacred city of Anuradapura2",
      title: "Sacred city of Anuradapura2",
      paragraph:
        "Anuraadapura was 3rd capital of the kingdom of Rajarata after Tambapanni and Upatissa Nuwara. The city, now a UNESCO World Heritage Sites, was the center of Theravada Buddhism for many centuries. Anuradhapura is famous for its well preserved ruins of ancient Sri Lankan civilization. Many places of historical and archaeological interest could be visited. Sri Maha Bodhi ( Sacred Bo-Tree ) was brought as a sapling of the tree under which Prince Siddhartha attained to enlightenment and it is over 2200 years old and is the oldest historically documented tree in the world. Ruwanweliseya (2nd century B.C) is the most famous of all the Dagobas. It originally depicted the perfect 'bubble shape' that modern restoration has not been able to accurately reproduce. 'Samadhi' Buddha statue (4th century AD) is one of the most famous statues, depicting the Buddha in a state of 'Samadhi' or deep meditation Isurumuniya rock temple (3rd century B.C) is well known for its rock carvings",
    },
    {
      image: "/images/polonnaruwa.jpg",
      alt: "Ancient City of Polonnaruwa2",
      title: "Ancient City of Polonnaruwa2",
      paragraph:
        "Polonnaruwa, which was the 2nd capital city of Sri Lanka built in the 11th and 12th centuries AD, and which is a world heritage site. Here you can see the ruins of the Royal Palace, the Gal Viharaya where 4 splendid statues of the Buddha in 'Upright', 'Sedentary' and 'Recumbent' postures carved out of rock could be seen, the Audience Hall, the Lotus Bath, the statue of king Parakramabahu, and e Parakrama Samudraya - a lake built by King Parakramabahu the great. There are also monuments of famous places of worship such as the Shiva Temple, the Lankathilake, the Watadage, the Galpotha, the Kiri Vehera and the remains of a former Temple of the Tooth Relic.",
    },
    {
      image: "/images/sigiriya.jpg",
      alt: "Sigiriya Rock Fortress2",
      title: "Sigiriya Rock Fortress2",
      paragraph:
        "The story of Sigiriya rock fortress is the tale of King Kashyapa who ruled between 477-495 AD. It was the largest and most sophisticated single construction project ever undertaken in ancient Sri Lanka. The ruins of the Sigiriya rock fortress seen today are less than twenty percent of the structures that graced area. The 'Lion Rock' is a citadel of unusual beauty rising 200 meters from the scrub jungle. The rock was the innermost stronghold of the 70 hectare fortified town. A moat, rampart, and extensive gardens including the renowned water gardens ring the base of the rock. Visit the world renowned frescoes of the 'Heavenly Maidens' of Sigiriya, which are in a sheltered pocket of the rock approached by a spiral stairway. These frescoes are painted in earth pigments on plaster.",
    },
  ];

  const itemsPerPage = 8;

  // Calculate pagination
  const totalPages = Math.ceil(contents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContents = contents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-5 md:px-0">
        <div className="hidden md:block">
          {currentContents.map((content, index) => (
            <ImageLeftRight
              key={index}
              img={`${basePath}${content.image}`}
              alt={content.alt}
              title={content.title}
              paragraph={content.paragraph}
              format={index % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 hidden md:block">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
        <div className="block md:hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            // pagination={{
            // clickable: true,
            // }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {contents.map((content, index) => (
              <SwiperSlide
                key={index}
                className=" rounded-xl md:shadow-lg transition overflow-hidden"
              >
                <ImageLeftRight
                  key={index}
                  img={content.image}
                  alt={content.alt}
                  title={content.title}
                  paragraph={content.paragraph}
                  format="right"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
