import { Button } from "@my-better-t-app/ui/components/button";
import { Input } from "@my-better-t-app/ui/components/input";
import { Bell, Command, Search } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import UserMenu from "@/components/user-menu";

import { Breadcrumbs } from "./DashboardPrimitives";

export function DashboardHeader({
  pageTitle,
  breadcrumbs,
}: {
  pageTitle: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}) {
  return (
    <header className="glass sticky top-0 z-20 border-b border-border/70 bg-surface/88 px-4 py-4 backdrop-blur-xl lg:px-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-2">
            {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">{pageTitle}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[220px] flex-1 xl:w-72 xl:flex-none">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
              <Input className="pl-9" placeholder="Search routes, layers, alerts..." />
            </div>
            <Button variant="outline" size="sm">
              <Command />
              Command Menu
            </Button>
            <Button variant="outline" size="icon">
              <Bell />
            </Button>
            <ModeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
