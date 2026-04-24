import { Link, useRouterState } from "@tanstack/react-router";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname === "/home" || pathname === "/") {
    return null;
  }

  const links = [
    { to: "/home", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
  ] as const;

  return (
    <div className="glass border-b border-border/70">
      <div className="mx-auto flex max-w-7xl flex-row items-center justify-between px-4 py-3">
        <nav className="flex gap-4 text-lg text-text-secondary">
          {links.map(({ to, label }) => {
            return (
              <Link key={to} to={to} className="transition-colors hover:text-text-primary">
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
