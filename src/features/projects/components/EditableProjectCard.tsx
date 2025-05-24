"use client";

import { Category, Project } from "@prisma/client";
import Image from "next/image";
import { EditProjectModalForm } from "./EditProjectModalForm";
import { DeleteProjectModalForm } from "./DeleteProjectModalForm";

export const EditableProjectCard = ({ project, categories }: { project: Project; categories: Category[] }) => {
  return (
    <div className="relative">
      <div className="bg-card relative overflow-hidden rounded-xl border shadow-lg">
        <div className="relative aspect-video w-full">
          <Image src={project.image} fill className="object-cover" alt={project.image} />
        </div>
        <div className="space-y-2 p-3 lg:p-6">
          <h3 className="text-lg font-bold lg:text-2xl">{project.name}</h3>
          <p className="text-muted-foreground text-sm">{project.summary}</p>
        </div>
      </div>
      <div className="bg-secondary/50 absolute top-0 left-0 flex gap-2 rounded-tl-xl border p-2">
        <EditProjectModalForm categories={categories} project={project} />
        <DeleteProjectModalForm project={project} />
      </div>
    </div>
  );
};
