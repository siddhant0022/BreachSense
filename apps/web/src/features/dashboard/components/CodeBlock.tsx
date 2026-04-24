import { cn } from "@my-better-t-app/ui/lib/utils";
import type { ReactNode } from "react";

import { CopyChip } from "./DashboardPrimitives";

export function CodeBlock({
  code,
  title,
  className,
}: {
  code: string;
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden border border-border/70 bg-background/60", className)}>
      <div className="flex items-center justify-between border-b border-border/70 px-3 py-2">
        <span className="text-xs uppercase tracking-[0.16em] text-text-muted">{title ?? "Snippet"}</span>
        <CopyChip value={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-text-primary">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function InlineKeyValue({
  label,
  value,
  action,
}: {
  label: string;
  value: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-3 last:border-b-0">
      <div>
        <div className="text-xs uppercase tracking-[0.16em] text-text-muted">{label}</div>
        <div className="mt-1 text-sm text-text-primary">{value}</div>
      </div>
      {action}
    </div>
  );
}
