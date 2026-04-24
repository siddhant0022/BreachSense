import { Button } from "@my-better-t-app/ui/components/button";

import type { Alert } from "../mock-data";
import { Panel } from "./DashboardPrimitives";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";

export function AlertList({
  alerts,
  onMarkRead,
  onResolve,
}: {
  alerts: Alert[];
  onMarkRead?: (alertId: string) => void;
  onResolve?: (alertId: string) => void;
}) {
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Panel key={alert.id} className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <SeverityBadge severity={alert.severity} />
                <StatusBadge value={alert.status} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary">{alert.title}</h3>
                <p className="text-sm text-text-secondary">{alert.summary}</p>
              </div>
            </div>
            <div className="text-right text-xs text-text-muted">
              <div>{alert.projectName}</div>
              <div>{alert.sourceLayerName}</div>
              <div>{alert.timestamp}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onMarkRead?.(alert.id)}>
              Mark as Read
            </Button>
            <Button variant="secondary" size="sm" onClick={() => onResolve?.(alert.id)}>
              Resolve
            </Button>
          </div>
        </Panel>
      ))}
    </div>
  );
}
