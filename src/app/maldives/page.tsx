"use client"
import ExploreCardSection from '@/components/ExploreCardSection'
import Hero from '@/components/Hero'
import React from 'react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Maldives() {
  return (
    <>
      <Hero image={`${basePath}/banners/image13.png`} titleDesktop='Explore Sri Lanka Your Way' titleMobile='Explore Sri Lanka Your Way'/>
      <ExploreCardSection/>
    </>
  )
}
