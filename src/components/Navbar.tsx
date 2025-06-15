"use client";

import { UserCircle } from "lucide-react";
import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogoutForm } from "../features/auth/components/LogoutForm";

export const Navbar = () => {
  const { status } = useSession();
  return (
    <nav className="absolute w-full">
      <div className="h-navbar px-padding container flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <UserCircle />
          <span className="font-medium lg:text-lg">JEUNIH</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {status === "authenticated" ? <LogoutForm /> : null}
        </div>
      </div>
    </nav>
  );
};
