import { cn } from "@my-better-t-app/ui/lib/utils";

import type { HealthStatus } from "../mock-data";

export function HealthIndicator({ status }: { status: HealthStatus }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "size-2.5 rounded-full",
          status === "healthy" && "bg-success shadow-[0_0_18px_rgba(16,185,129,0.7)]",
          status === "degraded" && "bg-warning shadow-[0_0_18px_rgba(245,158,11,0.6)]",
          status === "critical" && "bg-danger shadow-[0_0_18px_rgba(239,68,68,0.6)]",
          status === "disabled" && "bg-text-muted",
        )}
      />
      <span className="text-xs uppercase tracking-[0.14em] text-text-secondary">{status}</span>
    </div>
  );
}
