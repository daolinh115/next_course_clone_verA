'use client'

import { icons } from "@/constants/icons";
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import posthog from "posthog-js"

interface props {
  title: string;
  image: string|StaticImageData;
  slug: string;
  location: string;
  date: string;
  time: string
}

const EventCard = ({title, image, slug, location, date, time}: props) => {
  const handleClick = () => {
    posthog.capture('event_card_clicked', {
      event_title: title,
      event_slug: slug,
      event_location: location,
      event_date: date,
    })
  }

  return (
    <Link href={`/events/${slug}`} id="event-card" onClick={handleClick}>
        <Image src={image} alt="title" width={410} height={300} className="poster" />
        <div className="flex flex-row gap-2 mt-3 ">
          <Image src={icons.pin} alt="location" width={14} height={14} />
          <p>{location}</p>
        </div>
        <p className="title">{title}</p> 
        <div className="datetime flex flex-row flex-wrap items-center gap-4 text-light-200">
          <div className="flex flex-row gap-2">
            <Image src={icons.calendar} alt="date" width={14} height={14} />
            <p>{date}</p>
          </div>
          <div className="flex flex-row gap-2">
            <Image src={icons.clock} alt="time" width={14} height={14} />
            <p>{time}</p>
          </div>
        </div>
    </Link>
  )
}

export default EventCard