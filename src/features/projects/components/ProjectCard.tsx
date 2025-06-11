import { Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link className="bg-card overflow-hidden rounded-xl border shadow-lg transition-all duration-500 hover:-translate-y-2" href={project.url} target="_blank" key={project.id}>
      <div className="relative aspect-video w-full">
        <Image src={project.image} fill className="object-cover" alt={project.image} />
      </div>
      <div className="space-y-2 p-3 lg:p-6">
        <h3 className="text-lg font-bold lg:text-2xl">{project.name}</h3>
      </div>
    </Link>
  );
};
