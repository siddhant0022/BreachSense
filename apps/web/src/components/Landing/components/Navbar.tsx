"use client";

import { ToggleMode } from "./ToggleMode";

export default function Navbar() {
  return (
    <nav className="glass fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-border/70 px-8">
      <h1 className="text-xl font-bold tracking-tight text-text-primary">
        BreachSense
      </h1>

      <div className="hidden gap-6 text-sm text-text-secondary md:flex">
        <span>Product</span>
        <span>Layers</span>
        <span>Solutions</span>
        <span>Docs</span>
      </div>

      <div className="flex items-center gap-4">
        <ToggleMode />
        <button className="rounded-lg bg-primary px-4 py-2 text-background transition hover:bg-primary/90">
          Get Started
        </button>
      </div>
    </nav>
  );
}
