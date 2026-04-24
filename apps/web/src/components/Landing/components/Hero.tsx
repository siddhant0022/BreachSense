"use client";

import { motion } from "framer-motion";
import DataFlow from "./DataFlow";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-8 pt-32 relative">
      <div className="grid lg:grid-cols-2 gap-16 w-full max-w-7xl mx-auto">

        {/* LEFT */}
        <div className="space-y-6">
          <span className="text-xs text-primary">
            NODE STATUS: SECURE
          </span>

          <h1 className="text-5xl font-bold leading-tight">
            Your Data. <br />
            Secured in{" "}
            <span className="text-primary">
              Intelligent Layers
            </span>
          </h1>

          <p className="text-muted-foreground max-w-lg">
            Real-time protection across identity, network,
            and behavior — before breaches happen.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-lg border border-border text-foreground">
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