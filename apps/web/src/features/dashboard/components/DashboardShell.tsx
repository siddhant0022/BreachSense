import { Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

const titles: Array<{ prefix: string; title: string; breadcrumbs: Array<{ label: string; href?: string }> }> = [
  { prefix: "/dashboard/projects/", title: "Project Detail", breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }, { label: "Projects", href: "/dashboard/projects" }, { label: "Project" }] },
  { prefix: "/dashboard/projects", title: "Projects", breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }, { label: "Projects" }] },
  { prefix: "/dashboard/layers/", title: "Layer Detail", breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }, { label: "Layers", href: "/dashboard/layers" }, { label: "Layer" }] },
  { prefix: "/dashboard/layers", title: "Security Layers", breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }, { label: "Layers" }] },
  { prefix: "/dashboard/implementation", title: "Implementation Guide", breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }, { label: "Implementation" }] },
  { prefix: "/dashboard/events", title: "Security Events", breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }, { label: "Events" }] },
  { prefix: "/dashboard/alerts", title: "Alerts", breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }, { label: "Alerts" }] },
  { prefix: "/dashboard/analytics", title: "Analytics", breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }, { label: "Analytics" }] },
  { prefix: "/dashboard/api-keys", title: "API Keys", breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }, { label: "API Keys" }] },
  { prefix: "/dashboard/settings", title: "Settings", breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }, { label: "Settings" }] },
  { prefix: "/dashboard", title: "Overview", breadcrumbs: [{ label: "Dashboard" }] },
];

export function DashboardShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const headerState = useMemo(() => {
    return titles.find((item) => pathname.startsWith(item.prefix)) ?? titles[titles.length - 1]!;
  }, [pathname]);

  return (
    <div className="theme-shell min-h-full">
      <div className="grid min-h-[calc(100svh-57px)] lg:grid-cols-[288px_1fr]">
        <DashboardSidebar mobileOpen={mobileOpen} onToggleMobile={() => setMobileOpen((open) => !open)} />
        <div className="flex min-w-0 flex-col lg:pl-0">
          <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="glass flex size-10 items-center justify-center border border-border/70"
              aria-label="Toggle dashboard navigation"
            >
              <span className="block h-0.5 w-4 bg-text-primary shadow-[0_6px_0_0_var(--text-primary),0_-6px_0_0_var(--text-primary)]" />
            </button>
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-primary">BreachSense</div>
              <div className="text-sm text-text-secondary">Security console</div>
            </div>
          </div>
          <DashboardHeader pageTitle={headerState.title} breadcrumbs={headerState.breadcrumbs} />
          <main className="min-w-0 flex-1 px-4 py-5 lg:px-6 lg:py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
