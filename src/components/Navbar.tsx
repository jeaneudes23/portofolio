import { UserCircle } from "lucide-react";
import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";

export const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="absolute w-full">
      <div className="h-navbar px-padding container flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <UserCircle />
          <span className="font-medium lg:text-lg">JEUNIH</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button variant={"accent"}>Logout</Button>
            </form>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
