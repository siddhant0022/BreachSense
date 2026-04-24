"use client";

import { motion } from "framer-motion";

export default function DataFlow() {
  return (
    <div className="relative h-125 hidden lg:block">

      {/* FLOWING DOT */}
      <motion.div
        animate={{ y: [0, 300, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute h-3 w-3 rounded-full bg-primary-glow shadow-[0_0_24px_color-mix(in_oklab,var(--primary-glow)_55%,transparent)]"
      />

      {/* LAYERS */}
      {["Encryption", "Detection", "Masking"].map(
        (layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            className="glass glow absolute w-56 rounded-xl border border-border/70 p-4"
            style={{
              top: `${i * 120}px`,
              left: `${i % 2 === 0 ? "20%" : "50%"}`,
            }}
          >
            <p className="text-xs text-text-secondary">
              Layer {i + 1}
            </p>
            <h3 className="text-lg text-text-primary">{layer}</h3>
          </motion.div>
        )
      )}
    </div>
  );
}
