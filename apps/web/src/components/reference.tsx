import { authClient } from "@/lib/auth-client";
import {
  createFileRoute,
  redirect,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  BookMarked,
  GraduationCap,
  BarChart2,
  Star,
  LogOut,
  Plus,
  Search,
  Bell,
  Settings,
  FileText,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PersonalArchive } from "@/features/dashboard/components/personal-archive";
import { AnalyticsPage } from "@/features/analytics";
import { DashboardHome } from "@/features/insights";
import { Favorites } from "@/features/dashboard/components/favorites";
import { SubmissionsHistory } from "@/features/dashboard/components/submissions-history";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data) {
      throw redirect({ to: "/login" });
    }
    return { session: session.data };
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────
type ActiveView =
  | "dashboard"
  | "archive"
  | "practice"
  | "analytics"
  | "favorites";

// ─── Sidebar Navigation ───────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard" as ActiveView, label: "Overview", icon: LayoutDashboard },
  { id: "archive" as ActiveView, label: "Archive", icon: BookMarked },
  { id: "practice" as ActiveView, label: "Practice Engine", icon: GraduationCap },
  { id: "analytics" as ActiveView, label: "Insight Panel", icon: BarChart2 },
  { id: "favorites" as ActiveView, label: "Saved Problems", icon: Star },
];



// ─── Active-view content map ─────────────────────────────────────────────────
function ActiveScreen({
  active,
  session,
}: {
  active: ActiveView;
  session: { user: { name?: string | null; email: string } };
}) {
  switch (active) {
    case "archive":
      return <PersonalArchive />;
    case "practice":
      return <SubmissionsHistory />;
    case "analytics":
      return <AnalyticsPage session={session} />;
    case "favorites":
      return <Favorites />;
    default:
      return <DashboardHome session={session} />;
  }
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { session } = Route.useRouteContext();
  const navigate = useNavigate();
  const [active, setActive] = useState<ActiveView>("dashboard");

  async function handleSignOut() {
    await authClient.signOut();
    navigate({ to: "/login" });
  }

  return (
    <div className="text-secondary min-h-screen bg-[#080808] font-sans">
      {/* Global ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-primary/5 absolute top-[-15%] left-[-10%] h-[50%] w-[50%] rounded-full blur-[160px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-blue-500/[0.04] blur-[140px]" />
      </div>

      <div className="relative flex min-h-screen">
        {/* ── Sidebar ──────────────────────────────────────────────────────── */}
        <aside className="flex w-[200px] shrink-0 flex-col border-r border-white/6 bg-[#070707]">
          {/* Workspace badge */}
          <div className="flex items-center gap-3 border-b border-white/6 px-4 py-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
              <LayoutDashboard size={14} className="text-primary/60" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white">Workspace</p>
              <p className="text-[10px] text-white/30">Personal</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-0.5 px-2 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-medium transition-all",
                  active === item.id
                    ? "bg-white/[0.06] text-white"
                    : "text-white/35 hover:bg-white/[0.03] hover:text-white/60"
                )}
              >
                <item.icon
                  size={15}
                  className={
                    active === item.id ? "text-primary" : "text-white/30"
                  }
                />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Bottom items */}
          <div className="space-y-0.5 border-t border-white/6 px-2 py-4">
            {[
              { label: "Documentation", icon: FileText },
              { label: "Support", icon: HelpCircle },
            ].map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-medium text-white/25 transition-all hover:bg-white/[0.03] hover:text-white/50"
              >
                <item.icon size={14} className="text-white/20" />
                {item.label}
              </button>
            ))}
          </div>

          {/* New Project */}
          <div className="px-3 pb-4">
            <Link to="/test">
              <button className="border-primary/20 bg-primary/[0.08] text-primary/70 hover:bg-primary/[0.14] hover:text-primary flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-[11px] font-bold tracking-[0.18em] uppercase transition-all">
                <Plus size={12} /> New Assessment
              </button>
            </Link>
          </div>
        </aside>

        {/* ── Main ─────────────────────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="flex items-center justify-between border-b border-white/6 bg-[#070707]/80 px-6 py-3 backdrop-blur-xl">
            {/* Brand */}
            <Link
              to="/"
              className="text-lg font-bold tracking-tight text-white"
            >
              Ami<span className="text-primary">worthy</span>
            </Link>

            {/* Center nav */}
            <nav className="hidden items-center gap-6 md:flex">
              {["Assessments", "Signals", "Growth"].map((n) => (
                <button
                  key={n}
                  className="text-[13px] text-white/40 transition-colors hover:text-white"
                >
                  {n}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
                <Search size={13} className="text-white/30" />
                <input
                  placeholder="Search data..."
                  className="w-32 bg-transparent text-[12px] text-white/50 placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] text-white/30 transition-colors hover:border-white/15">
                <Bell size={14} />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] text-white/30 transition-colors hover:border-white/15">
                <Settings size={14} />
              </button>
              <button
                onClick={handleSignOut}
                title="Sign out"
                className="bg-primary/10 text-primary hover:bg-primary/20 flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 transition-colors"
              >
                <LogOut size={13} />
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-8">
            <AnimatePresence mode="wait">
              <ActiveScreen key={active} active={active} session={session} />
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}