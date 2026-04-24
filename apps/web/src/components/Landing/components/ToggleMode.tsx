"use client";

import { useTheme } from "@/components/theme-provider";

export function ToggleMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`px-3 py-1 rounded-full text-xs transition ${
        isDark
          ? "bg-primary/20 text-primary"
          : "bg-foreground/10 text-foreground"
      }`}
    >
      {isDark ? "Dark Mode" : "Light Mode"}
    </button>
  );
}