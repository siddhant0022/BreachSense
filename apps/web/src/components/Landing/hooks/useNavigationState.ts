"use client";

import {
  BookOpenText,
  Boxes,
  House,
  Layers3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export type NavigationItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

const NAV_ITEMS: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    icon: House,
    description: "Return to the landing overview",
  },
  {
    id: "product",
    label: "Product",
    icon: Boxes,
    description: "Inspect the core platform stack",
  },
  {
    id: "layers",
    label: "Layers",
    icon: Layers3,
    description: "Review the layered defense model",
  },
  {
    id: "solutions",
    label: "Solutions",
    icon: ShieldCheck,
    description: "Browse deployment scenarios",
  },
  {
    id: "docs",
    label: "Docs",
    icon: BookOpenText,
    description: "Open the documentation section",
  },
];

function getWrappedOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;

  if (offset > total / 2) {
    offset -= total;
  }

  if (offset < -total / 2) {
    offset += total;
  }

  return offset;
}

export function useNavigationState() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible?.target.id) {
          return;
        }

        setActiveId(visible.target.id);
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.65],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  function goToItem(id: string) {
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function moveBy(direction: 1 | -1) {
    const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeId);
    const nextIndex = (activeIndex + direction + NAV_ITEMS.length) % NAV_ITEMS.length;
    const nextItem = NAV_ITEMS[nextIndex];

    if (!nextItem) {
      return;
    }

    goToItem(nextItem.id);
  }

  function getOffsetFor(id: string) {
    const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeId);
    const itemIndex = NAV_ITEMS.findIndex((item) => item.id === id);

    return getWrappedOffset(itemIndex, activeIndex, NAV_ITEMS.length);
  }

  return {
    items: NAV_ITEMS,
    activeId,
    hoveredId,
    isMobile,
    setHoveredId,
    goToItem,
    moveBy,
    getOffsetFor,
  };
}
