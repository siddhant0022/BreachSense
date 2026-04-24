import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./apps/web/index.html",
    "./apps/web/src/**/*.{ts,tsx,css}",
    "./packages/ui/src/**/*.{ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070A",
        surface: "#0B0F14",
        primary: "#3B82F6",
        "primary-glow": "#22D3EE",
        accent: "#8B5CF6",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        text: {
          primary: "#E5E7EB",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
        foreground: "#E5E7EB",
        border: "color-mix(in oklab, #9CA3AF 18%, transparent)",
        card: "#0B0F14",
        popover: "#0B0F14",
        muted: "color-mix(in oklab, #0B0F14 82%, #9CA3AF 18%)",
        input: "color-mix(in oklab, #0B0F14 88%, #9CA3AF 12%)",
        ring: "#22D3EE",
        destructive: "#EF4444",
      },
    },
  },
};

export default config;
