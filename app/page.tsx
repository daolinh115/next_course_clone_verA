import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { IEvent } from '@/database/event.model'

import React from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

async function  Homepage() {

  const response = await fetch(`${BASE_URL}/api/events`)
  if(!response.ok){
    throw new Error('fail to fetch data')
  }
  const {events} = await response.json()

  return (
    <section  >
      <h1 className='animated-gradient-text text-center'>The Hub for Every Dev <br/> Event You can not miss</h1>
      <p className='mt-5 text-center font-schibsted'>Hackathons, Meetups, and Conferneces, All in One Place</p>

      <ExploreBtn />
      <div className='mt-20 space-y-7'>
        <h3>Feature Events</h3>
        <ul className='events'>
          {events.map((event:IEvent)=>(
            <li key={String(event._id)}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Homepage