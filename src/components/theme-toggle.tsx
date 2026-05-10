"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const initialTheme = getInitialTheme();
      setTheme(initialTheme);
      applyTheme(initialTheme);
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="切换深浅色主题"
      title="切换深浅色主题"
      className="relative grid h-9 w-16 grid-cols-2 items-center rounded-full border border-border bg-surface p-1 text-muted shadow-sm transition-colors hover:border-accent"
    >
      <span
        className={
          mounted && theme === "dark"
            ? "absolute left-8 top-1 size-7 rounded-full bg-accent shadow-sm transition-transform"
            : "absolute left-1 top-1 size-7 rounded-full bg-accent shadow-sm transition-transform"
        }
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={
          mounted && theme === "dark"
            ? "relative z-10 mx-auto size-4 text-muted"
            : "relative z-10 mx-auto size-4 text-background"
        }
        fill="none"
      >
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 2.75V5M12 19v2.25M4.75 4.75l1.6 1.6M17.65 17.65l1.6 1.6M2.75 12H5M19 12h2.25M4.75 19.25l1.6-1.6M17.65 6.35l1.6-1.6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={
          mounted && theme === "dark"
            ? "relative z-10 mx-auto size-4 text-background"
            : "relative z-10 mx-auto size-4 text-muted"
        }
        fill="none"
      >
        <path
          d="M20.2 14.1A7.2 7.2 0 0 1 9.9 3.8a8.4 8.4 0 1 0 10.3 10.3Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      <span className="sr-only">
        {mounted && theme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
      </span>
    </button>
  );
}
