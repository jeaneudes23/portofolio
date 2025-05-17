import { Mail } from 'lucide-react'
import React from 'react'

export const HeroSection = () => {
  return (
    <section
        style={{
            backgroundImage: "url('/wrapped.svg')",
            backgroundSize: "contain",
            backgroundPosition: "right top",
            backgroundRepeat: "no-repeat"
        }}
        className='h-screen place-content-center grid gap-16'
    >
        <h1 className='text-center'>
            <span className='lg:text-xl mb-4 block'>👋, I am Jean Eudes</span>
            <span className='text-header-main'>
                <span>FullStack</span>
                <span className='text-stroked text-backdrop/10'>Web Developer</span>
            </span>
        </h1>
        <a href="#contact" className="group bg-primary justify-self-center text-primary-foreground px-6 py-3 rounded-md font-medium tracking-wide inline-flex items-center gap-2">
            <span className='h-6 overflow-hidden'>
                <span className='grid group-hover:-translate-y-6 transition-all duration-300 ease-out'>                 
                    <span>Contact Me</span>
                    <span aria-hidden>Contact Me</span>
                </span>
            </span>
            <Mail className='size-5'/>
        </a>
    </section>
  )
}
