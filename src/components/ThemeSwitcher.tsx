"use client"
import { Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export const ThemeSwitcher = () => {

  const [isDarkMode,setIsDarkMode] = useState<boolean>(false)
  
  useEffect(() => {
    const isLocalDarkMode = localStorage.getItem('isDarkMode') == "true"
    setIsDarkMode(isLocalDarkMode)
  },[])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('isDarkMode', isDarkMode.toString())
  },[isDarkMode])


  return (
    <button onClick={() => setIsDarkMode(prev => !prev)} className="cursor-pointer border-2 border-subtle/50 rounded-full relative">
        <span className="sr-only">Toggle Theme</span>
        <span className={`absolute size-9 rounded-full top-0 left-0 transition-all ${isDarkMode ? 'translate-x-full bg-accent' : 'bg-primary'}`}></span>
        <div className='flex items-center relative'>
            <span className={`p-2 ${!isDarkMode ? 'text-primary-foreground' : ''}`}><Sun className='size-5'/></span>
            <span className='p-2'><Moon className='size-5'/></span>
        </div>
    </button>
  )
}
