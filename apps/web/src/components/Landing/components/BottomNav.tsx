"use client";

import NavItem from "@/components/Landing/components/NavItem";
import { useNavigationState } from "@/components/Landing/hooks/useNavigationState";
import { LayoutGroup, motion } from "framer-motion";
import type { KeyboardEvent } from "react";

const spring = {
  type: "spring",
  stiffness: 280,
  damping: 30,
  mass: 0.85,
} as const;

export default function BottomNav() {
  const { items, activeId, hoveredId, isMobile, setHoveredId, goToItem, moveBy, getOffsetFor } =
    useNavigationState();

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveBy(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(1);
    }
  }

  return (
    <motion.nav
      aria-label="Primary"
      onKeyDown={handleKeyDown}
      className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
    >
      <LayoutGroup>
        <motion.div
          className={[
            "pointer-events-auto relative overflow-hidden rounded-full border border-primary/15",
            "bg-surface/55 text-text-secondary shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl",
            isMobile ? "h-[4.6rem] w-[min(94vw,22rem)]" : "flex items-center gap-2 px-2 py-2",
          ].join(" ")}
          animate={{
            backdropFilter: hoveredId || isMobile ? "blur(28px)" : "blur(22px)",
            boxShadow:
              hoveredId || isMobile
                ? "0 0 0 1px rgba(59,130,246,0.12), 0 22px 60px rgba(0,0,0,0.38), 0 0 72px rgba(59,130,246,0.12)"
                : "0 18px 48px rgba(0,0,0,0.32)",
          }}
          transition={spring}
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
          <div className="pointer-events-none absolute inset-x-10 bottom-1 h-8 rounded-full bg-primary/10 blur-2xl" />

          {isMobile ? (
            <div className="relative h-full w-full">
              {items.map((item) => {
                const offset = getOffsetFor(item.id);
                const isActive = activeId === item.id;
                const isHovered = hoveredId === item.id || isActive;

                return (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={isActive}
                    isHovered={isHovered}
                    isMobile
                    offset={offset}
                    onSelect={goToItem}
                    onHoverChange={setHoveredId}
                  />
                );
              })}
            </div>
          ) : (
            items.map((item) => {
              const isActive = activeId === item.id;
              const isHovered = hoveredId === item.id;

              return (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  isHovered={isHovered}
                  isMobile={false}
                  offset={0}
                  onSelect={goToItem}
                  onHoverChange={setHoveredId}
                />
              );
            })
          )}
        </motion.div>
      </LayoutGroup>
    </motion.nav>
  );
}
