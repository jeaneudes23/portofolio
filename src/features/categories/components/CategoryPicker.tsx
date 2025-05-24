"use client";

import { Category } from "@prisma/client";
import { ChevronsUpDown } from "lucide-react";
import React from "react";

interface Props {
  categories: Category[];
  currentCategory: string | null;
  switchCategory: (category: string | null) => void;
}

export const CategoryPicker = ({ categories, currentCategory, switchCategory }: Props) => {
  return (
    <div className="group relative shrink-0 basis-full text-sm sm:basis-44">
      <button className="hover:bg-card focus-within:border-accent inline-flex w-full cursor-pointer items-center gap-1 rounded-xl border-2 px-2 py-1 font-medium tracking-tight whitespace-pre transition-all">
        <ChevronsUpDown className="size-4" />
        {currentCategory || "All projects"}
      </button>
      <div className="bg-card pointer-events-none absolute right-0 z-10 grid w-full translate-y-4 rounded-md border py-2 opacity-0 shadow-md transition-all group-focus-within:pointer-events-auto group-focus-within:translate-y-2 group-focus-within:opacity-100">
        <button className="hover:bg-foreground/10 flex cursor-pointer justify-start p-2 font-medium tracking-tight transition-colors" onClick={() => switchCategory(null)}>
          {"All projects"}
        </button>
        {categories.map((category) => (
          <button className="hover:bg-foreground/10 flex cursor-pointer justify-start p-2 font-medium tracking-tight transition-colors" key={category.id} onClick={() => switchCategory(category.name)}>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
