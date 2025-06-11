import { Tool } from "@prisma/client";
import { Code } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  my_tools_title: string;
  tools: Tool[];
}

export const MyToolsSection = ({ my_tools_title, tools }: Props) => {
  return (
    <section className="space-y-4">
      <h3 className="flex items-center justify-end gap-2 font-semibold lg:text-lg">
        <Code className="size-5" /> {my_tools_title}
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {tools.map((tool) => (
          <div key={tool.id} className="bg-card group ring-accent relative cursor-pointer rounded-md p-6 shadow transition-all hover:z-10 hover:scale-110 hover:ring-2">
            <Image src={tool.icon} alt={tool.name} width={0} height={0} className="mx-auto aspect-square w-full max-w-24 object-contain" />
            <span aria-hidden className="bg-accent text-accent-foreground absolute top-2 right-2 scale-150 rounded-full px-2 py-1 text-xs font-medium capitalize opacity-0 shadow transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
