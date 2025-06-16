import { EditContactMeSection } from "@/features/contacts/components/EditContactMeSection";
import { EditAboutMeSection } from "@/features/content/components/EditAboutMeSection";
import { EditHeroSection } from "@/features/content/components/EditHeroSection";
import { ManageSiteInfo } from "@/features/content/components/ManageSiteInfo";
import { EditMyProjectsSection } from "@/features/projects/components/EditMyProjectsSection";
import { EditToolsSection } from "@/features/tools/components/EditToolsSection";
import prisma from "@/lib/prisma";
import React from "react";

export const revalidate = 0

export default async function page() {
  const [content, tools, categoriesWithProjects, links, metadata] = await Promise.all([
    prisma.content.findFirst(),
    prisma.tool.findMany({
      orderBy: {
        order: "desc",
      },
    }),
    prisma.category.findMany({
      include: {
        projects: {
          orderBy: {
            order: "asc",
          },
        },
      },
    }),
    prisma.link.findMany(),
    prisma.metadata.findFirst(),
  ]);

  return (
    <main>
      <EditHeroSection hero_title_first_line={content?.hero_title_first_line || ""} hero_title_second_line={content?.hero_title_second_line || ""} hero_title_third_line={content?.hero_title_third_line || ""} />
      <div className="px-padding container grid items-center gap-12 md:grid-cols-2">
        <EditAboutMeSection about_me_title={content?.about_me_title || ""} about_me_description={content?.about_me_description || ""} />
        <EditToolsSection my_tools_title={content?.my_tools_title || ""} tools={tools} />
      </div>
      <EditMyProjectsSection my_projects_title={content?.my_projects_title || ""} categoriesWithProjects={categoriesWithProjects} />
      <EditContactMeSection contact_me_title={content?.contact_me_title || ""} contact_me_description={content?.contact_me_description || ""} />
      <ManageSiteInfo metadata={metadata!} links={links} />
    </main>
  );
}
