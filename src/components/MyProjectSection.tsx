"use client"

import { Category, Project } from '@prisma/client'
import { ChevronsUpDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface CategoryWithProjects extends Category {
  projects: Project[]
}

interface Props {
  categoriesWithProjects: CategoryWithProjects[]
}
export const MyProjectSection = ({ categoriesWithProjects }: Props) => {

  const [currentCategory, setCurrentCategory] = useState<string | null>(null)

  const projects = categoriesWithProjects.filter(category => !currentCategory || category.name == currentCategory).flatMap(category => category.projects)
  return (
    <section className='container space-y-6 lg:space-y-10 my-section px-padding'>
      <div className='flex justify-between items-center flex-wrap'>
        <h2 className='text-header-section'>My Projects</h2>
        <div className='group relative text-sm min-w-44 '>
          <button className='w-full font-medium tracking-tight px-2 py-1 border-2 rounded-xl inline-flex items-center gap-1 cursor-pointer border-subtle/50'>
            <ChevronsUpDown className='size-4' />
            {currentCategory || 'All'}
          </button>
          <div className='opacity-0 translate-y-2 pointer-events-none group-focus-within:opacity-100 group-focus-within:pointer-events-auto grid absolute bg-card w-full z-10 py-2 right-0 rounded-md shadow-md shadow-subtle/10'>
            {categoriesWithProjects.map(category =>
              <button className='cursor-pointer font-medium tracking-tight flex justify-start p-2 hover:bg-foreground/10 transition-colors' key={category.id} onClick={() => setCurrentCategory(category.name)}>{category.name}</button>
            )}
            <button className='cursor-pointer font-medium tracking-tight flex justify-start p-2 hover:bg-foreground/10 transition-colors' onClick={() => setCurrentCategory(null)}>{'All'}</button>
          </div>
        </div>
      </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 col-span-full'>
        {projects.map(project =>
          <Link className='bg-card border border-subtle/5 rounded-xl overflow-hidden shadow-lg shadow-subtle/10 hover:-translate-y-2 transition-all duration-500' href={project.url} target='_blank' key={project.id}>
            <div className='aspect-video w-full relative'>
              <Image src={project.image} fill className='object-cover' alt={project.image} />
            </div>
            <div className='p-3 lg:p-6 space-y-2'>
              <h3 className='text-lg lg:text-2xl font-bold'>{project.name}</h3>
              <p className='text-sm text-subtle'>{project.summary}</p>
            </div>
          </Link>
        )}
      </div>
    </section>
  )
}

