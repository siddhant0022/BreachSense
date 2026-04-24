import { Button } from "@my-better-t-app/ui/components/button";
import { cn } from "@my-better-t-app/ui/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  Blocks,
  SlidersHorizontal,
  FolderKanban,
  KeyRound,
  LayoutDashboard,
  Menu,
  Settings,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";

import { StatusBadge } from "./StatusBadge";

const navigation = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { to: "/dashboard/layers", label: "Layers", icon: Blocks },
  { to: "/dashboard/layers/configure", label: "Layer Config", icon: SlidersHorizontal },
  { to: "/dashboard/implementation", label: "Implementation", icon: Workflow },
  { to: "/dashboard/events", label: "Events", icon: ShieldCheck },
  { to: "/dashboard/alerts", label: "Alerts", icon: AlertTriangle },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/api-keys", label: "API Keys", icon: KeyRound },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardSidebar({
  mobileOpen,
  onToggleMobile,
}: {
  mobileOpen: boolean;
  onToggleMobile: () => void;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <>
      <Button variant="outline" size="icon" className="lg:hidden" onClick={onToggleMobile}>
        {mobileOpen ? <X /> : <Menu />}
      </Button>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={onToggleMobile}
          aria-label="Close dashboard navigation"
        />
      ) : null}

      <aside
        className={cn(
          "glass fixed inset-y-0 left-0 z-40 w-72 border-r border-border/70 bg-surface/96 p-5 transition-transform duration-200 lg:static lg:block lg:w-72 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col gap-6">
          <div className="space-y-4">
            <div className="space-y-2 border-b border-border/60 pb-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-primary">BreachSense</p>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-text-primary">Security Console</h2>
                <p className="text-sm text-text-secondary">API protection operations for engineering teams.</p>
              </div>
            </div>
            <div className="rounded-sm border border-primary/20 bg-primary/8 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Platform posture</span>
                <StatusBadge value="protected" />
              </div>
              <p className="text-sm text-text-secondary">82/100 security score across 4 monitored projects.</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {navigation.map((item) => {
              const active =
                pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(`${item.to}/`));
              const Icon = item.icon;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 border px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "border-primary/35 bg-primary/12 text-text-primary"
                      : "border-transparent text-text-secondary hover:border-border/60 hover:bg-background/35 hover:text-text-primary",
                  )}
                  onClick={() => {
                    if (mobileOpen) onToggleMobile();
                  }}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="rounded-sm border border-border/70 bg-background/40 p-3 text-sm text-text-secondary">
            <div className="mb-1 text-xs uppercase tracking-[0.16em] text-text-muted">Coverage</div>
            <div>9 of 10 security layers enabled in production.</div>
          </div>
        </div>
      </aside>
    </>
  );
}
