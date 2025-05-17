import { Link as LinkType } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  links: LinkType[];
}
export const Footer = ({ links }: Props) => {
  return (
    <footer className="border-subtle/50 px-padding border-t py-6 text-sm">
      <div className="container flex flex-wrap items-center justify-center gap-2 sm:justify-between">
        <p className="text-subtle">© Copyright 2024. All rights reserved.</p>
        <div className="flex items-center justify-center gap-2">
          {links.map((link) => (
            <Link className="font-medium capitalize hover:underline" target="_blank" href={link.url} key={link.id}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
