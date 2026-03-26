'use client'

import { icons } from "@/constants/icons"
import Image from "next/image"
import posthog from "posthog-js"

const ExploreBtn = () => {
  const handleClick = () => {
    console.log('This works')
    posthog.capture('explore_events_clicked')
  }

  return (
    <button type='button' id='explore-btn' onClick={handleClick}>
        <a href='#events'>
            Explore Events
            <Image src={icons.arrow} alt="arrow-icon" width={24} height={24} />
        </a>
    </button>
  )
}

export default ExploreBtn