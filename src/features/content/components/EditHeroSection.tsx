import { EditContent } from "@/features/content/components/EditContent";
import { Mail } from "lucide-react";
import React from "react";

interface Props {
  hero_title_first_line: string;
  hero_title_second_line: string;
  hero_title_third_line: string;
}

export const EditHeroSection = ({ hero_title_first_line, hero_title_second_line, hero_title_third_line }: Props) => {
  return (
    <section
      style={{
        backgroundImage: "url('/wrapped.svg')",
        backgroundSize: "contain",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
      }}
      className="grid h-screen place-content-center gap-16"
    >
      <h1 className="text-center">
        <EditContent field="hero_title_first_line" className="mb-4 block lg:text-xl">
          {hero_title_first_line}
        </EditContent>
        <span className="">
          <EditContent field="hero_title_second_line" className="text-header-main">
            {hero_title_second_line}
          </EditContent>
          <EditContent field="hero_title_third_line" className="text-header-main text-stroked text-backdrop/10 focus-within:text-foreground">
            {hero_title_third_line}
          </EditContent>
        </span>
      </h1>
      <a href="#contact" className="group bg-primary text-primary-foreground inline-flex items-center gap-2 justify-self-center rounded-md px-6 py-3 font-medium tracking-wide">
        <span className="h-6 overflow-hidden">
          <span className="grid transition-all duration-300 ease-out group-hover:-translate-y-6">
            <span>Contact Me</span>
            <span aria-hidden>Contact Me</span>
          </span>
        </span>
        <Mail className="size-5" />
      </a>
    </section>
  );
};
