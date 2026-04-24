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
          ? "border border-primary/25 bg-primary/12 text-primary"
          : "border border-border bg-surface/80 text-text-secondary"
      }`}
    >
      {isDark ? "Dark Locked" : "Theme Sync"}
    </button>
  );
}
