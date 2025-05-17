import { AdminNavbar } from "@/components/AdminNavbar";
import { EditAboutMeSection } from "@/components/EditAboutMeSection";
import { EditHeroSection } from "@/components/EditHeroSection";
import prisma from "@/lib/prisma";
import React from "react";

export default async function page() {
  const [content] = await Promise.all([prisma.content.findFirst()]);
  return (
    <>
      <AdminNavbar />
      <EditHeroSection hero_title_first_line={content?.hero_title_first_line || ""} hero_title_second_line={content?.hero_title_second_line || ""} hero_title_third_line={content?.hero_title_third_line || ""} />
      <EditAboutMeSection about_me_title={content?.about_me_title || ""} about_me_description={content?.about_me_description || ""} />
    </>
  );
}
