import { icons } from "@/constants/icons";
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface props {
  title: string;
  image: string|StaticImageData;
  slug: string;
  location: string;
  date: string;
  time: string
}

const EventCard = ({title, image, slug, location, date, time}: props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
        <Image src={image} alt="title" width={410} height={300} className="poster" />
        <div className="flex flex-row gap-2 mt-3 ">
          <Image src={icons.pin} alt="location" width={14} height={14} />
          <p>{location}</p>
        </div>
        <p className="title mt-2">{title}</p> 
        <div className="datetime flex flex-row gap-4 mt-2">
          <div className="flex flex-row gap-2">
            <Image src={icons.calendar} alt="calendar" width={14} height={14} />
            <p>{date}</p>
         </div>
          <div className="flex flex-row gap-2">
            <Image src={icons.calendar} alt="time" width={14} height={14} />
            <p>{time}</p>
         </div>
        </div>
        
    </Link>
  )
}

export default EventCard