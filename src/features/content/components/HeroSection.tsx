import { Mail } from "lucide-react";
import React from "react";

interface Props {
  hero_title_first_line: string;
  hero_title_second_line: string;
  hero_title_third_line: string;
}

export const HeroSection = ({ hero_title_first_line, hero_title_second_line, hero_title_third_line }: Props) => {
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
        <span className="mb-4 block lg:text-xl">{hero_title_first_line}</span>
        <span className="text-header-main">
          <span>{hero_title_second_line}</span>
          <span className="text-stroked text-backdrop/10">{hero_title_third_line}</span>
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
