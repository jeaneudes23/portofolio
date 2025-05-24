import { AdminNavbar } from "@/components/AdminNavbar";
import { EditAboutMeSection } from "@/components/EditAboutMeSection";
import { EditHeroSection } from "@/components/EditHeroSection";
import { EditToolsSection } from "@/features/tools/EditToolsSection";
import prisma from "@/lib/prisma";
import React from "react";

export default async function page() {
  const [content, tools] = await Promise.all([
    prisma.content.findFirst(),
    prisma.tool.findMany({
      orderBy: {
        order: "desc",
      },
    }),
  ]);

  return (
    <>
      <AdminNavbar />
      <EditHeroSection hero_title_first_line={content?.hero_title_first_line || ""} hero_title_second_line={content?.hero_title_second_line || ""} hero_title_third_line={content?.hero_title_third_line || ""} />
      <section className="px-padding container grid items-center gap-12 md:grid-cols-2">
        <EditAboutMeSection about_me_title={content?.about_me_title || ""} about_me_description={content?.about_me_description || ""} />
        <EditToolsSection my_tools_title={content?.my_tools_title || ""} tools={tools} />
      </section>
    </>
  );
}
