import { AboutMeSection } from "@/components/AboutMeSection";
import { ContactMeSection } from "@/components/ContactMeSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { MyProjectSection } from "@/components/MyProjectSection";
import { Navbar } from "@/components/Navbar";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export default async function Home() {
  const [content, categoriesWithProjects, links] = await Promise.all([
    prisma.content.findFirst(),
    prisma.category.findMany({
      include: {
        projects: true,
      },
    }),
    prisma.link.findMany(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection hero_title_first_line={content?.hero_title_first_line || ""} hero_title_second_line={content?.hero_title_second_line || ""} hero_title_third_line={content?.hero_title_third_line || ""} />
        <AboutMeSection about_me_title={content?.about_me_title || ""} about_me_description={content?.about_me_description || ""} />
        <MyProjectSection github={links.filter((link) => link.name.toLocaleLowerCase() === "github")[0]} categoriesWithProjects={categoriesWithProjects} />
        <ContactMeSection contact_me_description={content?.contact_me_description || ""} />
        <Footer links={links} />
      </main>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await prisma.metadata.findFirst();
  return {
    title: metadata?.title,
    description: metadata?.description,
    keywords: metadata?.keywords,
    robots: "index,follow",
  };
}
