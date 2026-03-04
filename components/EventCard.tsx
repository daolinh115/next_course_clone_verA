import { icons } from "@/constants/icons";
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface props {
  title: string;
  image: string|StaticImageData;
  slug: string;
  location: string;
  data: string;
  time: string
}

const EventCard = ({title, image, slug, location, data, time}: props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
        <Image src={image} alt="title" width={410} height={300} className="poster" />
        <div className="flex flex-row gap-2 ">
          <Image src={icons.pin} alt="location" width={14} height={14} />
          <p>{location}</p>
        </div>
        <p className="title">{title}</p> 
    </Link>
  )
}

export default EventCard