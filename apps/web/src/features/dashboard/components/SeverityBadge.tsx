import { cn } from "@my-better-t-app/ui/lib/utils";

import type { Severity } from "../mock-data";

const severityStyles: Record<Severity, string> = {
  low: "border-border/70 bg-background/40 text-text-secondary",
  medium: "border-warning/30 bg-warning/10 text-warning",
  high: "border-primary/30 bg-primary/10 text-primary",
  critical: "border-danger/30 bg-danger/10 text-danger",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em]",
        severityStyles[severity],
      )}
    >
      {severity}
    </span>
  );
}
