"use client";

import { ToggleMode } from "./ToggleMode";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass px-8 h-20 flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-tight">
        BreachSense
      </h1>

      <div className="hidden md:flex gap-6 text-sm text-muted-foreground">
        <span>Product</span>
        <span>Layers</span>
        <span>Solutions</span>
        <span>Docs</span>
      </div>

      <div className="flex items-center gap-4">
        <ToggleMode />
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
          Get Started
        </button>
      </div>
    </nav>
  );
}