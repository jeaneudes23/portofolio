import prisma from '@/lib/prisma'
import Image from 'next/image'
import React from 'react'

interface Props {
  about_me_description: string
}
export const AboutMeSection = async ({about_me_description}: Props) => {
  const tools = await prisma.tool.findMany()
  return (
    <section className='container px-padding grid md:grid-cols-2 gap-12 items-center'>
      <div>
        <h2 className='text-header-section'>About Me</h2>
        <p className='text-subtle tracking-wide leading-7 mt-4 mb-12'>{about_me_description}</p>
        <hr className='text-subtle'/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-1'>
        {tools.map(tool => 
          <div key={tool.id} className='bg-card p-6'>
            <Image src={tool.icon} alt={tool.name} width={0} height={0} className='w-full max-w-24 mx-auto aspect-square object-contain'/>
          </div>
        )}
      </div>
    </section>
  )
}
