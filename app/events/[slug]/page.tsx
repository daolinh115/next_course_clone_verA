import { icons } from '@/constants/icons'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetailItem = ({icon, alt, label}:{icon: string, alt: string, label: string}) => (
  <div className='flex flex-row gap-2'>
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
)

const EventAgenda = ({agendaItems}:{agendaItems:string[]}) => (
  <div>
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item)=>(
        <li key={item}>item</li>
      ))}
    </ul>
  </div>
)

const EventDetailPage = async({params}:{params:Promise<{slug:string}>}) => {

  const {slug} = await params
  const request = await fetch(`${BASE_URL}/api/events/${slug}`)
  const {event: {description, image, overview, date, time, location, mode, agenda, audience, tags}} = await request.json()

  if(!description) return notFound()

  return (
    
    <section id='event'>
      
      <div className='header'>
        <h1>Event Description</h1>
        <p className='mt-2'>{description}</p>
      </div>
      <div className='details'>
        {/* Left side - Event content */}
        <div className='content'>
          <Image src={image.secure_url} alt='Event Banner' width={400} height={400} className='banner' />
        </div>
        <section className='flex flex-col gap-2'>
          <h2>Overview</h2>
          <p>{overview}</p>
        </section>
        <section className='flex flex-col gap-2'>
          <h2>Event Details</h2>
          <EventDetailItem icon={icons.calendar} alt='calendar' label={date.split('T')[0]} />
          <EventDetailItem icon={icons.clock} alt='clock' label={time} />
          <EventDetailItem icon={icons.pin} alt='pin' label={location} />
          <EventDetailItem icon={icons.mode} alt='mode' label={mode} />
          <EventDetailItem icon={icons.audience} alt='audience' label={audience} />
        </section>

        <EventAgenda agendaItems={agenda} />

        {/* Right side - Booking form */}
        <aside className='booking'>
          <p className='font-bold text-lg'>Book Event</p>
        </aside>
      </div>
    </section>
  )
}

export default EventDetailPage
