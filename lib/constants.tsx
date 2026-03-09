// lib/constants.tsx
// This file exports an array of real or popular developer events for use in EventCard components.


export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: 'JSConf EU 2026',
    image: '/images/event1.png',
    slug: 'jsconf-eu-2026',
    location: 'Berlin, Germany',
    date: '2026-06-15',
    time: '09:00',
  },
  {
    title: 'React Summit 2026',
    image: '/images/event2.png',
    slug: 'react-summit-2026',
    location: 'Amsterdam, Netherlands',
    date: '2026-04-20',
    time: '10:00',
  },
  {
    title: 'HackZurich 2026',
    image: '/images/event3.png',
    slug: 'hackzurich-2026',
    location: 'Zurich, Switzerland',
    date: '2026-09-18',
    time: '18:00',
  },
  {
    title: 'PyCon US 2026',
    image: '/images/event4.png',
    slug: 'pycon-us-2026',
    location: 'Portland, OR, USA',
    date: '2026-05-01',
    time: '08:30',
  },
  {
    title: 'DevFest NYC 2026',
    image: '/images/event5.png',
    slug: 'devfest-nyc-2026',
    location: 'New York City, USA',
    date: '2026-10-10',
    time: '11:00',
  },
  {
    title: 'FOSSASIA Summit 2026',
    image: '/images/event6.png',
    slug: 'fossasia-summit-2026',
    location: 'Singapore',
    date: '2026-03-20',
    time: '09:30',
  },
];
