import { Button } from "@my-better-t-app/ui/components/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@my-better-t-app/ui/components/card";
import { Link } from "@tanstack/react-router";

import type { SecurityLayer } from "../mock-data";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";
import { ToggleSwitch } from "./DashboardPrimitives";
import { HealthIndicator } from "./HealthIndicator";

export function LayerCard({
  layer,
  enabled,
  onToggle,
}: {
  layer: SecurityLayer;
  enabled: boolean;
  onToggle: (value: boolean) => void;
}) {
  return (
    <Card className="glass border border-border/70 bg-surface/82">
      <CardHeader className="border-b border-border/60">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <CardTitle className="text-base text-text-primary">{layer.name}</CardTitle>
            <p className="max-w-md text-sm text-text-secondary">{layer.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge value={enabled ? "active" : "inactive"} />
            <SeverityBadge severity={layer.severity} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex flex-wrap gap-2 text-xs text-text-secondary">
          <span className="rounded-sm border border-border/70 px-2 py-1">{layer.category}</span>
          <span className="rounded-sm border border-border/70 px-2 py-1">{layer.plan}</span>
        </div>
        <div className="flex items-center justify-between">
          <HealthIndicator status={layer.healthStatus} />
          <ToggleSwitch checked={enabled} onChange={onToggle} label={`${layer.name} enabled state`} />
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <span className="text-xs text-text-muted">{layer.detects[0]}</span>
        <Link to="/dashboard/layers/$layerId" params={{ layerId: layer.id }}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
