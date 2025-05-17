import { UserCircle } from 'lucide-react'
import React from 'react'
import { ThemeSwitcher } from './ThemeSwitcher'

export const Navbar = () => {
  return (
    <nav className="absolute w-full">
      <div className='h-navbar container flex items-center px-padding justify-between'>
        <a href="#" className='inline-flex items-center gap-2'>
        <UserCircle />
        <span className='font-medium lg:text-lg'>JEUNIH</span>
      </a>
      <ThemeSwitcher />
      </div>
    </nav>
  )
}
