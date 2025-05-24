import { UserCircle } from "lucide-react";
import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="absolute w-full">
      <div className="h-navbar px-padding container flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <UserCircle />
          <span className="font-medium lg:text-lg">JEUNIH</span>
        </Link>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};
