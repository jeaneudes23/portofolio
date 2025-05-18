import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { EditMetaData } from "@/features/metadata/components/EditMetaData";

export const AdminNavbar = () => {
  return (
    <nav className="absolute w-full">
      <div className="h-navbar px-padding container flex items-center justify-between">
        <EditMetaData />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};
