import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Loader } from "lucide-react";
import React from "react";

export default function loading() {
  return (
    <div className="grid h-screen place-content-center">
      <div className="hidden">
        <ThemeSwitcher />
      </div>
      <div>
        <Loader className="size-16 animate-spin" />
      </div>
    </div>
  );
}
