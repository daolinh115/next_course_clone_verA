'use client'

import { icons } from "@/constants/icons"
import Image from "next/image"

const ExploreBtn = () => {
  return (
    <button type='button' id='explore-btn' onClick={()=>console.log('This works')}>
        <a href='#events'>
            Explore Events
            <Image src={icons.arrow} alt="arrow-icon" width={24} height={24} />
        </a>
    </button>
  )
}

export default ExploreBtn