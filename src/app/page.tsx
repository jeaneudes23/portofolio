import { AboutMeSection } from "@/features/content/components/AboutMeSection";
import { ContactMeSection } from "@/features/contacts/components/ContactMeSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/features/content/components/HeroSection";
import { MyProjectSection } from "@/features/projects/components/MyProjectSection";
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
    <main>
      <HeroSection hero_title_first_line={content?.hero_title_first_line || ""} hero_title_second_line={content?.hero_title_second_line || ""} hero_title_third_line={content?.hero_title_third_line || ""} />
      <AboutMeSection my_tools_title={content?.my_tools_title || ""} about_me_title={content?.about_me_title || ""} about_me_description={content?.about_me_description || ""} />
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
