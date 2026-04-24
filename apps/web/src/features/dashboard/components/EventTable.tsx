import { Button } from "@my-better-t-app/ui/components/button";

import type { SecurityEvent } from "../mock-data";
import { DataTable } from "./DashboardPrimitives";
import { SeverityBadge } from "./SeverityBadge";

export function EventTable({
  events,
  onSelect,
}: {
  events: SecurityEvent[];
  onSelect?: (event: SecurityEvent) => void;
}) {
  return (
    <DataTable
      columns={["Severity", "Type", "Project", "Layer", "Endpoint", "Method", "Timestamp", ""]}
      rows={events.map((event) => [
        <SeverityBadge severity={event.severity} />,
        <div className="space-y-1">
          <div className="font-medium text-text-primary">{event.type}</div>
          <div className="text-xs text-text-muted">{event.id}</div>
        </div>,
        event.projectName,
        event.layerName,
        <code className="text-xs text-text-primary">{event.endpoint}</code>,
        <span className="text-xs uppercase tracking-[0.16em]">{event.method}</span>,
        event.timestamp,
        <Button variant="ghost" size="sm" onClick={() => onSelect?.(event)}>
          Inspect
        </Button>,
      ])}
    />
  );
}
