"use client";

import { motion } from "framer-motion";

export default function DataFlow() {
  return (
    <div className="relative h-125 hidden lg:block">

      {/* FLOWING DOT */}
      <motion.div
        animate={{ y: [0, 300, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute w-3 h-3 bg-blue-400 rounded-full"
      />

      {/* LAYERS */}
      {["Encryption", "Detection", "Masking"].map(
        (layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            className="glass p-4 rounded-xl absolute w-56 glow"
            style={{
              top: `${i * 120}px`,
              left: `${i % 2 === 0 ? "20%" : "50%"}`,
            }}
          >
            <p className="text-xs text-muted-foreground">
              Layer {i + 1}
            </p>
            <h3 className="text-lg">{layer}</h3>
          </motion.div>
        )
      )}
    </div>
  );
}