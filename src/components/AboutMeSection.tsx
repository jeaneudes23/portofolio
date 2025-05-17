import prisma from "@/lib/prisma";
import { Code } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  about_me_title: string;
  about_me_description: string;
}
export const AboutMeSection = async ({ about_me_description, about_me_title }: Props) => {
  const tools = await prisma.tool.findMany();
  return (
    <section className="px-padding container grid items-center gap-12 md:grid-cols-2">
      <div>
        <h2 className="text-header-section">{about_me_title}</h2>
        <p className="text-subtle mt-4 mb-12 leading-7 tracking-wide">{about_me_description}</p>
        <hr className="text-subtle" />
      </div>
      <div className="space-y-4">
        <h3 className="flex items-center justify-end gap-2 font-semibold lg:text-lg">
          <Code className="size-5" /> Tools & frameworks I use
        </h3>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-card group ring-accent relative cursor-pointer p-6 transition-all hover:z-10 hover:scale-110 hover:rounded-md hover:ring-2">
              <Image src={tool.icon} alt={tool.name} width={0} height={0} className="mx-auto aspect-square w-full max-w-24 object-contain" />
              <span aria-hidden className="bg-subtle text-background absolute top-2 right-2 scale-150 rounded-full px-2 py-1 text-xs font-medium capitalize opacity-0 shadow transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
