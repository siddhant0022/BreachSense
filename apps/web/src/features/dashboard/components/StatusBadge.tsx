import { cn } from "@my-better-t-app/ui/lib/utils";

import type { AlertStatus, ApiKeyRecord, HealthStatus, ProjectStatus, TeamMember } from "../mock-data";

type StatusValue =
  | HealthStatus
  | ProjectStatus
  | AlertStatus
  | ApiKeyRecord["status"]
  | TeamMember["status"]
  | "active"
  | "inactive";

const statusStyles: Record<StatusValue, string> = {
  healthy: "border-success/30 bg-success/10 text-success",
  degraded: "border-warning/30 bg-warning/10 text-warning",
  critical: "border-danger/30 bg-danger/10 text-danger",
  disabled: "border-border/70 bg-background/40 text-text-muted",
  protected: "border-success/30 bg-success/10 text-success",
  monitoring: "border-primary/30 bg-primary/10 text-primary",
  "at-risk": "border-danger/30 bg-danger/10 text-danger",
  new: "border-danger/30 bg-danger/10 text-danger",
  investigating: "border-warning/30 bg-warning/10 text-warning",
  resolved: "border-success/30 bg-success/10 text-success",
  active: "border-primary/30 bg-primary/10 text-primary",
  inactive: "border-border/70 bg-background/40 text-text-muted",
  rotating: "border-warning/30 bg-warning/10 text-warning",
  revoked: "border-border/70 bg-background/40 text-text-muted",
  pending: "border-warning/30 bg-warning/10 text-warning",
};

export function StatusBadge({ value }: { value: StatusValue }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em]",
        statusStyles[value],
      )}
    >
      {value}
    </span>
  );
}
