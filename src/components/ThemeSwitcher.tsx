"use client";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isLocalDarkMode = localStorage.getItem("isDarkMode") == "true";
    setIsDarkMode(isLocalDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("isDarkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <button onClick={() => setIsDarkMode((prev) => !prev)} className="relative cursor-pointer rounded-full border-2">
      <span className="sr-only">Toggle Theme</span>
      <span className={`absolute top-0 left-0 size-9 rounded-full transition-all ${isDarkMode ? "bg-accent translate-x-full" : "bg-primary"}`}></span>
      <div className="relative flex items-center">
        <span className={`p-2 ${!isDarkMode ? "text-primary-foreground" : ""}`}>
          <Sun className="size-5" />
        </span>
        <span className="p-2">
          <Moon className="size-5" />
        </span>
      </div>
    </button>
  );
};
