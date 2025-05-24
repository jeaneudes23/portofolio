"use client";

import { CategoryPicker } from "@/features/categories/components/CategoryPicker";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { Category, Link as LinkType, Project } from "@prisma/client";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";

export interface CategoryWithProjects extends Category {
  projects: Project[];
}

interface Props {
  github?: LinkType;
  my_projects_title: string;
  categoriesWithProjects: CategoryWithProjects[];
}
export const MyProjectSection = ({ my_projects_title, categoriesWithProjects, github }: Props) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const categories = categoriesWithProjects.map((category) => ({ id: category.id, name: category.name }));
  const switchCategory = useCallback((category: string | null) => {
    setCurrentCategory(category);
  }, []);

  const projects = categoriesWithProjects.filter((category) => !currentCategory || category.name == currentCategory).flatMap((category) => category.projects);

  return (
    <section className="my-section px-padding container space-y-6 lg:space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-header-section">{my_projects_title}</h2>
        <CategoryPicker categories={categories} currentCategory={currentCategory} switchCategory={switchCategory} />
      </div>
      <div className="col-span-full grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {github && (
        <div className="flex justify-center text-center">
          <Link target="_blank" href={github.url} className="group bg-accent text-accent-foreground inline-flex items-center gap-2 justify-self-center rounded-md px-6 py-3 font-medium tracking-wide">
            <GithubIcon className="size-5" />
            <span className="h-6 overflow-hidden">
              <span className="grid transition-all duration-300 ease-out group-hover:-translate-y-6">
                <span>View More</span>
                <span aria-hidden>{github.name}</span>
              </span>
            </span>
          </Link>
        </div>
      )}
    </section>
  );
};
