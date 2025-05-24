"use client";

import { CategoryWithProjects } from "@/features/projects/components/MyProjectSection";
import { CategoryPicker } from "@/features/categories/components/CategoryPicker";
import React, { useCallback, useState } from "react";
import { EditableProjectCard } from "./EditableProjectCard";
import { NewProjectModalForm } from "./NewProjectModalForm";
import { EditContent } from "@/features/content/components/EditContent";
import { ManageCategoriesModal } from "@/features/categories/components/ManageCategoriesModal";

interface Props {
  my_projects_title: string;
  categoriesWithProjects: CategoryWithProjects[];
}

export const EditMyProjectsSection = ({ my_projects_title, categoriesWithProjects }: Props) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const categories = categoriesWithProjects.map((category) => ({ id: category.id, name: category.name }));

  const switchCategory = useCallback((category: string | null) => {
    setCurrentCategory(category);
  }, []);

  const projects = categoriesWithProjects.filter((category) => !currentCategory || category.name == currentCategory).flatMap((category) => category.projects);

  return (
    <section className="my-section px-padding container space-y-6 lg:space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <EditContent field="my_projects_title" className="text-header-section">
          {my_projects_title}
        </EditContent>
        <div className="flex items-center gap-1">
          <CategoryPicker categories={categories} currentCategory={currentCategory} switchCategory={switchCategory} />
          <ManageCategoriesModal categories={categories} />
        </div>
      </div>
      <div className="col-span-full grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <EditableProjectCard categories={categories} key={project.id} project={project} />
        ))}
        <NewProjectModalForm categories={categories} />
      </div>
    </section>
  );
};
