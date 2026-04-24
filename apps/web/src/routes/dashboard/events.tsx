import { Button } from "@my-better-t-app/ui/components/button";
import { Input } from "@my-better-t-app/ui/components/input";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { EventTable } from "@/features/dashboard/components/EventTable";
import {
  PageIntro,
  Panel,
  SectionTitle,
  SideDrawer,
  TabGroup,
} from "@/features/dashboard/components/DashboardPrimitives";
import { SeverityBadge } from "@/features/dashboard/components/SeverityBadge";
import { securityEvents } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/events")({
  component: EventsPage,
});

type SeverityFilter = "all" | "low" | "medium" | "high" | "critical";

function EventsPage() {
  const [severity, setSeverity] = useState<SeverityFilter>("all");
  const [layerFilter, setLayerFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [endpointFilter, setEndpointFilter] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    return securityEvents.filter((event) => {
      const matchesSeverity = severity === "all" || event.severity === severity;
      const matchesLayer = layerFilter === "" || event.layerName.toLowerCase().includes(layerFilter.toLowerCase());
      const matchesProject = projectFilter === "" || event.projectName.toLowerCase().includes(projectFilter.toLowerCase());
      const matchesEndpoint = endpointFilter === "" || event.endpoint.toLowerCase().includes(endpointFilter.toLowerCase());

      return matchesSeverity && matchesLayer && matchesProject && matchesEndpoint;
    });
  }, [endpointFilter, layerFilter, projectFilter, severity]);

  const selectedEvent = filteredEvents.find((event) => event.id === selectedEventId) ?? null;

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Event stream"
        title="Security events"
        description="Filter the event stream by severity, source layer, project, or endpoint to inspect suspicious activity."
      />

      <Panel className="space-y-4">
        <SectionTitle title="Filters" description="Local UI state only. No backend calls are made." />
        <div className="grid gap-3 lg:grid-cols-[auto_repeat(3,minmax(0,1fr))]">
          <TabGroup
            tabs={[
              { value: "all", label: "All" },
              { value: "critical", label: "Critical" },
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
            active={severity}
            onChange={setSeverity}
          />
          <Input placeholder="Filter by layer" value={layerFilter} onChange={(event) => setLayerFilter(event.target.value)} />
          <Input placeholder="Filter by project" value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)} />
          <Input placeholder="Filter by endpoint" value={endpointFilter} onChange={(event) => setEndpointFilter(event.target.value)} />
        </div>
      </Panel>

      <Panel>
        <EventTable events={filteredEvents} onSelect={(event) => setSelectedEventId(event.id)} />
      </Panel>

      <SideDrawer
        open={selectedEvent !== null}
        onClose={() => setSelectedEventId(null)}
        title={selectedEvent?.type ?? "Event detail"}
        description={selectedEvent?.timestamp}
      >
        {selectedEvent ? (
          <>
            <div className="flex flex-wrap gap-2">
              <SeverityBadge severity={selectedEvent.severity} />
              <Button variant="outline" size="sm">
                Escalate
              </Button>
            </div>
            <div className="space-y-3 border border-border/70 bg-background/35 p-4">
              <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Summary</div>
              <p className="text-sm text-text-secondary">{selectedEvent.description}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="border border-border/70 p-3">
                <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Project</div>
                <div className="mt-1 text-sm text-text-primary">{selectedEvent.projectName}</div>
              </div>
              <div className="border border-border/70 p-3">
                <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Layer</div>
                <div className="mt-1 text-sm text-text-primary">{selectedEvent.layerName}</div>
              </div>
              <div className="border border-border/70 p-3">
                <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Endpoint</div>
                <div className="mt-1 text-sm text-text-primary"><code>{selectedEvent.endpoint}</code></div>
              </div>
              <div className="border border-border/70 p-3">
                <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Method</div>
                <div className="mt-1 text-sm text-text-primary">{selectedEvent.method}</div>
              </div>
            </div>
          </>
        ) : null}
      </SideDrawer>
    </div>
  );
}
