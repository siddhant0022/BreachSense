"use client";

import { Link } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();

  return (
    <nav className="glass fixed inset-x-0 top-0 z-50 border-b border-border/70">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <Link
          to="/home"
          className="group relative inline-flex items-center gap-3 text-xl font-semibold tracking-[0.18em] text-text-primary uppercase"
        >
          <span className="relative flex size-10 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
            <span className="absolute inset-1 rounded-full border border-primary/20" />
            <span className="relative z-10 text-sm font-bold">BS</span>
          </span>
          <span className="bg-linear-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
            BracheSense
          </span>
        </Link>

        <Link
          to={session ? "/dashboard" : "/login"}
          className="rounded-full border border-primary/25 bg-primary px-5 py-2 text-sm font-medium text-background shadow-[0_0_36px_rgba(59,130,246,0.2)] transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          {session ? "Dashboard" : "Get Started"}
        </Link>
      </div>
    </nav>
  );
}
