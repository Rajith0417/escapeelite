import AdvancedSearchFilters from '@/components/AdvancedSearchFilters'
import FeaturedAccommodationSection from '@/components/FeaturedAccommodationSection'
import Hero from '@/components/Hero'
import React from 'react'

export default function HotelResort() {
  return (
    <>
      <Hero image={'banners/image9.png'} titleDesktop='Accommodation'/>
      <FeaturedAccommodationSection />
    </>
  )
}
