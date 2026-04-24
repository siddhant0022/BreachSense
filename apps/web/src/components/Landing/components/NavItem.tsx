"use client";

import type { NavigationItem } from "@/components/Landing/hooks/useNavigationState";
import { AnimatePresence, motion } from "framer-motion";

type NavItemProps = {
  item: NavigationItem;
  isActive: boolean;
  isHovered: boolean;
  isMobile: boolean;
  offset: number;
  onSelect: (id: string) => void;
  onHoverChange: (id: string | null) => void;
};

const spring = {
  type: "spring",
  stiffness: 320,
  damping: 28,
  mass: 0.8,
} as const;

export default function NavItem({
  item,
  isActive,
  isHovered,
  isMobile,
  offset,
  onSelect,
  onHoverChange,
}: NavItemProps) {
  const Icon = item.icon;
  const showLabel = isMobile ? isActive : isHovered;

  return (
    <motion.button
      layout
      type="button"
      aria-label={item.label}
      aria-current={isActive ? "true" : undefined}
      title={item.description}
      onClick={() => onSelect(item.id)}
      onFocus={() => onHoverChange(item.id)}
      onBlur={() => onHoverChange(null)}
      onHoverStart={() => onHoverChange(item.id)}
      onHoverEnd={() => onHoverChange(null)}
      className={[
        "group/nav-item relative flex items-center justify-center overflow-hidden rounded-full border outline-none",
        "border-border/70 bg-surface/55 text-text-secondary backdrop-blur-xl",
        "focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/25",
        isMobile
          ? "absolute top-1/2 left-1/2 h-14 min-w-14 -translate-x-1/2 -translate-y-1/2 px-3"
          : "h-14 px-4",
      ].join(" ")}
      animate={
        isMobile
          ? {
              x: offset * 72,
              scale: isActive ? 1.1 : Math.max(0.82, 1 - Math.abs(offset) * 0.08),
              opacity: Math.abs(offset) > 2 ? 0 : Math.max(0.28, 0.95 - Math.abs(offset) * 0.18),
              zIndex: isActive ? 30 : 20 - Math.abs(offset),
              y: isActive ? -4 : 0,
              boxShadow: isActive
                ? "0 0 0 1px rgba(59,130,246,0.35), 0 0 40px rgba(59,130,246,0.24)"
                : isHovered
                  ? "0 0 0 1px rgba(59,130,246,0.18), 0 14px 32px rgba(0,0,0,0.35)"
                  : "0 10px 26px rgba(0,0,0,0.24)",
            }
          : {
              scale: isHovered ? 1.04 : 1,
              y: isHovered ? -3 : 0,
              boxShadow: isHovered
                ? "0 0 0 1px rgba(59,130,246,0.28), 0 0 46px rgba(59,130,246,0.18)"
                : "0 12px 30px rgba(0,0,0,0.28)",
            }
      }
      transition={spring}
    >
      {(isActive || isHovered) && (
        <motion.span
          layoutId={`${isMobile ? "mobile" : "desktop"}-nav-highlight`}
          className="absolute inset-0 rounded-full bg-primary/12"
          transition={spring}
        />
      )}

      <motion.span
        className={[
          "absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-300",
          isActive || isHovered ? "opacity-100" : "",
        ].join(" ")}
        aria-hidden="true"
      >
        <span className="absolute inset-x-4 inset-y-2 rounded-full bg-primary/18" />
      </motion.span>

      <span className="relative z-10 flex items-center gap-2">
        <motion.span
          animate={{
            scale: isHovered || isActive ? 1.12 : 1,
            color: isHovered || isActive ? "#3B82F6" : "#9CA3AF",
          }}
          transition={spring}
          className="flex size-8 items-center justify-center rounded-full"
        >
          <Icon className="size-[1.05rem]" strokeWidth={2} />
        </motion.span>

        <AnimatePresence initial={false}>
          {showLabel && (
            <motion.span
              initial={{ opacity: 0, y: 10, width: 0 }}
              animate={{ opacity: 1, y: 0, width: "auto" }}
              exit={{ opacity: 0, y: 10, width: 0 }}
              transition={spring}
              className="overflow-hidden text-sm font-medium whitespace-nowrap text-text-primary"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
