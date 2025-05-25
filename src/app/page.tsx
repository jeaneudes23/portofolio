import { AboutMeSection } from "@/features/content/components/AboutMeSection";
import { ContactMeSection } from "@/features/contacts/components/ContactMeSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/features/content/components/HeroSection";
import { MyProjectSection } from "@/features/projects/components/MyProjectSection";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { MyToolsSection } from "@/features/tools/components/MyToolsSection";

export default async function Home() {
  const [content, categoriesWithProjects, tools, links] = await Promise.all([
    prisma.content.findFirst(),
    prisma.category.findMany({
      include: {
        projects: true,
      },
    }),
    prisma.tool.findMany({
      orderBy: {
        order: "desc",
      },
    }),
    prisma.link.findMany(),
  ]);

  return (
    <main>
      <HeroSection hero_title_first_line={content?.hero_title_first_line || ""} hero_title_second_line={content?.hero_title_second_line || ""} hero_title_third_line={content?.hero_title_third_line || ""} />
      <div className="px-padding container grid items-center gap-12 md:grid-cols-2">
        <AboutMeSection about_me_title={content?.about_me_title || ""} about_me_description={content?.about_me_description || ""} />
        <MyToolsSection my_tools_title={content?.my_tools_title || ""} tools={tools} />
      </div>
      <MyProjectSection my_projects_title={content?.my_projects_title || ""} github={links.filter((link) => link.name.toLocaleLowerCase() === "github")[0]} categoriesWithProjects={categoriesWithProjects} />
      <ContactMeSection contact_me_title={content?.contact_me_title || ""} contact_me_description={content?.contact_me_description || ""} />
      <Footer links={links} />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await prisma.metadata.findFirst();

  if (!metadata)
    return {
      title: "Portofolio",
    };

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      siteName: metadata.title,
      type: "profile",
      images: {
        url: metadata.image,
        secureUrl: metadata.image,
        alt: metadata.image,
      },
    },
    robots: "index,follow",
  };
}
