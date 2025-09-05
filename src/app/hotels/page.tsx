import FeaturedAccommodationSection from '@/components/FeaturedAccommodationSection'
import Hero from '@/components/Hero'
import React from 'react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function HotelResort() {
  return (
    <>
      <Hero image={`${basePath}/banners/image9.png`} titleDesktop='Accommodation' titleMobile='Accommodation' fullScreen={false}/>
      <FeaturedAccommodationSection />
    </>
  )
}
