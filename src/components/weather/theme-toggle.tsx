"use client";

import { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeMode = "light" | "dark";

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  window.localStorage.setItem("weather-theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("weather-theme");
    const initialTheme: ThemeMode =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    applyTheme(initialTheme);

    const frame = window.requestAnimationFrame(() => {
      setTheme(initialTheme);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function toggleTheme() {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <Button
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "rounded-full border border-slate-950/10 bg-white/88 px-4 py-2 text-current shadow-sm backdrop-blur-md",
        "hover:bg-slate-100 dark:border-white/10 dark:bg-white/10 dark:shadow-none dark:hover:bg-white/15",
      )}
      onClick={toggleTheme}
      type="button"
      variant="ghost"
    >
      {theme === "dark" ? (
        <>
          <SunMedium className="size-4" />
          Light
        </>
      ) : (
        <>
          <Moon className="size-4" />
          Dark
        </>
      )}
    </Button>
  );
}
