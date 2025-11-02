"use client"
import ExploreCardSection from '@/components/ExploreCardSection'
import Hero from '@/components/Hero'
import React from 'react'
export default function Attractions() {
  return (
    <>
      <Hero image={`/banners/image13.png`} titleDesktop='Explore Sri Lanka Your Way' titleMobile='Explore Sri Lanka Your Way'/>
      <ExploreCardSection/>
    </>
  )
}
