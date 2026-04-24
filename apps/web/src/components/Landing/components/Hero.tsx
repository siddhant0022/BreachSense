"use client";

import DataFlow from "./DataFlow";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen scroll-mt-28 items-center px-8 pt-32">
      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-2">

        {/* LEFT */}
        <div className="space-y-6">
          <span className="text-xs font-medium tracking-[0.22em] text-primary">
            NODE STATUS: SECURE
          </span>

          <h1 className="text-5xl font-bold leading-tight text-text-primary">
            Your Data. <br />
            Secured in{" "}
            <span className="bg-linear-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Intelligent Layers
            </span>
          </h1>

          <p className="max-w-lg text-text-secondary">
            Real-time protection across identity, network,
            and behavior — before breaches happen.
          </p>

          <div className="flex gap-4">
            <button className="rounded-lg bg-primary px-6 py-3 text-background shadow-[0_0_40px_color-mix(in_oklab,var(--primary)_20%,transparent)] transition hover:bg-primary/90">
              Get Started
            </button>
            <button className="rounded-lg border border-border bg-surface/75 px-6 py-3 text-text-primary transition hover:border-primary/30 hover:bg-surface">
              Live Demo
            </button>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <DataFlow />
      </div>
    </section>
  );
}
