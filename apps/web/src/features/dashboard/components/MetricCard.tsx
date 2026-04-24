import { Card, CardContent, CardHeader, CardTitle } from "@my-better-t-app/ui/components/card";
import type { LucideIcon } from "lucide-react";

export function MetricCard({
  title,
  value,
  delta,
  icon: Icon,
}: {
  title: string;
  value: string;
  delta: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="glass border border-border/70 bg-surface/75">
      <CardHeader className="border-b border-border/60">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs uppercase tracking-[0.18em] text-text-secondary">{title}</CardTitle>
          <div className="rounded-sm border border-primary/20 bg-primary/10 p-2 text-primary">
            <Icon className="size-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-4">
        <div className="text-3xl font-semibold tracking-tight text-text-primary">{value}</div>
        <p className="text-xs text-text-secondary">{delta}</p>
      </CardContent>
    </Card>
  );
}
