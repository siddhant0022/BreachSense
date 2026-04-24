import { Button } from "@my-better-t-app/ui/components/button";
import { cn } from "@my-better-t-app/ui/lib/utils";
import { Link } from "@tanstack/react-router";
import { Copy, X } from "lucide-react";
import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border/70 pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        {eyebrow ? <p className="text-[11px] uppercase tracking-[0.28em] text-primary">{eyebrow}</p> : null}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary lg:text-3xl">{title}</h1>
          {description ? <p className="max-w-3xl text-sm text-text-secondary">{description}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-text-muted">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.href ? (
            <Link to={item.href} className="transition-colors hover:text-text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-secondary">{item.label}</span>
          )}
          {index < items.length - 1 ? <span>/</span> : null}
        </div>
      ))}
    </div>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden border border-border/70 bg-surface/80 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold tracking-wide text-text-primary">{title}</h2>
        {description ? <p className="text-xs text-text-secondary">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PlaceholderChart({
  data,
  accent = "var(--primary)",
  suffix = "",
}: {
  data: Array<{ label: string; value: number }>;
  accent?: string;
  suffix?: string;
}) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="space-y-4">
      <div className="grid h-48 grid-cols-[repeat(auto-fit,minmax(48px,1fr))] items-end gap-3">
        {data.map((item) => (
          <div key={item.label} className="flex h-full flex-col justify-end gap-2">
            <div
              className="rounded-sm border border-white/10 bg-gradient-to-t from-primary/70 via-primary/30 to-primary-glow/30"
              style={{
                height: `${Math.max(14, (item.value / max) * 100)}%`,
                boxShadow: `0 0 30px color-mix(in oklab, ${accent} 20%, transparent)`,
              }}
            />
            <div className="space-y-1">
              <p className="text-[11px] text-text-muted">{item.label}</p>
              <p className="text-xs text-text-secondary">
                {item.value}
                {suffix}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 text-[11px] text-text-muted">
        <div className="rounded-sm border border-border/60 bg-background/40 px-2 py-1">Live placeholder</div>
        <div className="rounded-sm border border-border/60 bg-background/40 px-2 py-1">Swap with charts later</div>
        <div className="rounded-sm border border-border/60 bg-background/40 px-2 py-1">Mock local data</div>
      </div>
    </div>
  );
}

export function DataTable({
  columns,
  rows,
  empty,
}: {
  columns: string[];
  rows: ReactNode[][];
  empty?: string;
}) {
  return (
    <div className="overflow-hidden border border-border/70">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border/70 text-left">
          <thead className="bg-background/40">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {rows.length ? (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-background/35">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-3 align-top text-sm text-text-secondary">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-3 py-6 text-sm text-text-muted" colSpan={columns.length}>
                  {empty ?? "No records found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors",
        checked
          ? "border-primary/50 bg-primary/25 text-primary"
          : "border-border/80 bg-background/55 text-text-muted",
      )}
    >
      <span
        className={cn(
          "inline-block size-4 rounded-full bg-current transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-4 backdrop-blur-sm">
      <div className="glass w-full max-w-lg border border-border/70 bg-surface/95 p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            {description ? <p className="text-sm text-text-secondary">{description}</p> : null}
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SideDrawer({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/70 backdrop-blur-sm">
      <button type="button" className="flex-1" aria-label="Close detail panel" onClick={onClose} />
      <div className="glass h-full w-full max-w-xl border-l border-border/70 bg-surface/96 p-5">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            {description ? <p className="text-sm text-text-secondary">{description}</p> : null}
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X />
          </Button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

export function CopyChip({ value }: { value: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        void navigator.clipboard?.writeText(value);
      }}
    >
      <Copy />
      Copy
    </Button>
  );
}

export function TabGroup<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: Array<{ value: T; label: string }>;
  active: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-2 rounded-sm border border-border/70 bg-background/45 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            "px-3 py-1.5 text-xs transition-colors",
            tab.value === active
              ? "bg-primary/15 text-primary"
              : "text-text-secondary hover:bg-background/70 hover:text-text-primary",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
