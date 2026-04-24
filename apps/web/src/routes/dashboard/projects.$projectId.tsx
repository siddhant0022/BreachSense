import { Button } from "@my-better-t-app/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@my-better-t-app/ui/components/card";
import { createFileRoute } from "@tanstack/react-router";

import { CodeBlock, InlineKeyValue } from "@/features/dashboard/components/CodeBlock";
import { HealthIndicator } from "@/features/dashboard/components/HealthIndicator";
import { PageIntro, Panel, SectionTitle } from "@/features/dashboard/components/DashboardPrimitives";
import { SeverityBadge } from "@/features/dashboard/components/SeverityBadge";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";
import {
  getEventsForProject,
  getProjectById,
  layerHealthStatuses,
  securityLayers,
} from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/projects/$projectId")({
  component: ProjectDetailPage,
  notFoundComponent: () => <div className="text-sm text-text-secondary">Project not found.</div>,
});

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const project = getProjectById(projectId);

  if (!project) {
    return <div className="text-sm text-text-secondary">Project not found.</div>;
  }

  const events = getEventsForProject(projectId).slice(0, 5);
  const activeLayers = securityLayers.filter((layer) => layer.enabled).slice(0, project.activeLayersCount);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Project detail"
        title={project.name}
        description={`Primary endpoint ${project.primaryEndpoint}. Last seen ${project.lastSeen}.`}
        actions={
          <>
            <StatusBadge value={project.status} />
            <StatusBadge value={project.sdkConnected ? "active" : "inactive"} />
          </>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Panel className="space-y-4">
          <SectionTitle title="Project overview" description="Current security stance and integration state." />
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border border-border/70 bg-background/35">
              <CardHeader><CardTitle className="text-xs uppercase tracking-[0.16em] text-text-muted">Risk score</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-semibold text-text-primary">{project.riskScore}</div></CardContent>
            </Card>
            <Card className="border border-border/70 bg-background/35">
              <CardHeader><CardTitle className="text-xs uppercase tracking-[0.16em] text-text-muted">Active layers</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-semibold text-text-primary">{project.activeLayersCount}</div></CardContent>
            </Card>
            <Card className="border border-border/70 bg-background/35">
              <CardHeader><CardTitle className="text-xs uppercase tracking-[0.16em] text-text-muted">Events</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-semibold text-text-primary">{project.eventsCount}</div></CardContent>
            </Card>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <InlineKeyValue label="SDK connection" value={project.sdkConnected ? "Connected and streaming telemetry" : "Awaiting SDK setup"} />
            <InlineKeyValue label="Environment" value={project.environment} />
            <InlineKeyValue label="Primary endpoint" value={<code>{project.primaryEndpoint}</code>} />
            <InlineKeyValue label="Last activity" value={project.lastSeen} />
          </div>
        </Panel>

        <Panel>
          <SectionTitle title="API key preview" description="Project-scoped key visible in masked form only." action={<Button size="sm">Rotate Key</Button>} />
          <CodeBlock title="Current key" code={project.apiKeyPreview} />
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <SectionTitle title="Recent events" description="Latest signals associated with this project." />
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex flex-col gap-3 border-b border-border/60 pb-3 last:border-b-0 last:pb-0 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <SeverityBadge severity={event.severity} />
                    <span className="font-medium text-text-primary">{event.type}</span>
                  </div>
                  <div className="text-sm text-text-secondary">{event.description}</div>
                </div>
                <div className="text-xs text-text-muted">{event.timestamp}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionTitle title="Layer health" description="Enabled protection layers mapped to this project." />
          <div className="space-y-3">
            {activeLayers.map((layer) => {
              const health = layerHealthStatuses.find((item) => item.layerId === layer.id);

              return (
                <div key={layer.id} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{layer.name}</div>
                    <div className="text-xs text-text-muted">{health?.uptime} uptime · {health?.latency}</div>
                  </div>
                  <HealthIndicator status={layer.healthStatus} />
                </div>
              );
            })}
          </div>
        </Panel>
      </section>
    </div>
  );
}
