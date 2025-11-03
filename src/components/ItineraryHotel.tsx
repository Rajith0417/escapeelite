import React from 'react'
import ItineraryTabs from './ItineraryTabs'
import { TabItem } from './ItineraryInnerTabs'

function ItineraryHotel() {
    const tabs: TabItem[] = [];
  return (
    <section className="py-16">
          <div className="container mx-auto px-5">
            <ItineraryTabs tabs={tabs} />
          </div>
        </section>
  )
}

export default ItineraryHotel
