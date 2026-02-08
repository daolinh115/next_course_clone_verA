import { icons } from '@/constants/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <header>
        <nav>
            <Link href={'/'} className='logo'>
                <Image src={icons.logo} alt='logo' width={30} height={30} />
                <p>DevEvent</p>
            </Link>
            <ul className='flex-center gap-6' >
                <Link href={'/'}>Home</Link>
                <Link href={'/'}>Events</Link>
                <Link href={'/'}>Create Events</Link>
            </ul>
        </nav>
    </header>
  )
}

export default NavBar