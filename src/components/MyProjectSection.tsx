"use client";

import { Category, Project } from "@prisma/client";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface CategoryWithProjects extends Category {
  projects: Project[];
}

interface Props {
  categoriesWithProjects: CategoryWithProjects[];
}
export const MyProjectSection = ({ categoriesWithProjects }: Props) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const projects = categoriesWithProjects.filter((category) => !currentCategory || category.name == currentCategory).flatMap((category) => category.projects);
  return (
    <section className="my-section px-padding container space-y-6 lg:space-y-10">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-header-section">My Projects</h2>
        <div className="group relative min-w-44 text-sm">
          <button className="border-subtle/50 inline-flex w-full cursor-pointer items-center gap-1 rounded-xl border-2 px-2 py-1 font-medium tracking-tight">
            <ChevronsUpDown className="size-4" />
            {currentCategory || "All"}
          </button>
          <div className="bg-card shadow-subtle/10 pointer-events-none absolute right-0 z-10 grid w-full translate-y-2 rounded-md py-2 opacity-0 shadow-md transition-all duration-300 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
            <button className="hover:bg-foreground/10 flex cursor-pointer justify-start p-2 font-medium tracking-tight transition-colors" onClick={() => setCurrentCategory(null)}>
              {"All"}
            </button>
            {categoriesWithProjects.map((category) => (
              <button className="hover:bg-foreground/10 flex cursor-pointer justify-start p-2 font-medium tracking-tight transition-colors" key={category.id} onClick={() => setCurrentCategory(category.name)}>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-full grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link className="bg-card border-subtle/5 shadow-subtle/10 overflow-hidden rounded-xl border shadow-lg transition-all duration-500 hover:-translate-y-2" href={project.url} target="_blank" key={project.id}>
            <div className="relative aspect-video w-full">
              <Image src={project.image} fill className="object-cover" alt={project.image} />
            </div>
            <div className="space-y-2 p-3 lg:p-6">
              <h3 className="text-lg font-bold lg:text-2xl">{project.name}</h3>
              <p className="text-subtle text-sm">{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
