import { Button } from "@my-better-t-app/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@my-better-t-app/ui/components/card";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, Blocks, ShieldCheck } from "lucide-react";

import { HealthIndicator } from "@/features/dashboard/components/HealthIndicator";
import { MetricCard } from "@/features/dashboard/components/MetricCard";
import {
  PageIntro,
  Panel,
  PlaceholderChart,
  SectionTitle,
} from "@/features/dashboard/components/DashboardPrimitives";
import { SeverityBadge } from "@/features/dashboard/components/SeverityBadge";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";
import { analytics, layerHealthStatuses, projects, securityEvents } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverviewPage,
});

function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Executive view"
        title="API security posture at a glance"
        description="Track live risk, event volume, layer health, and the endpoints drawing the most security pressure across your monitored projects."
        actions={
          <>
            <Button variant="outline" size="sm">
              Export Snapshot
            </Button>
            <Button size="sm">Review Alerts</Button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard title="Security Score" value={`${analytics.securityScore}/100`} delta="Improved 6 points over the last week." icon={ShieldCheck} />
        <MetricCard title="Total Events" value={analytics.totalEvents.toLocaleString()} delta="Up 12% compared to yesterday." icon={Activity} />
        <MetricCard title="Critical Alerts" value={String(analytics.criticalAlerts)} delta="Two require engineering action." icon={AlertTriangle} />
        <MetricCard title="Active Layers" value={String(analytics.activeLayers)} delta="Coverage across edge, payload, and identity." icon={Blocks} />
        <MetricCard title="Healthy Layers" value={String(analytics.healthyLayers)} delta="One degraded layer under review." icon={ShieldCheck} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <Panel>
          <SectionTitle title="Risk trend" description="7-day composite risk posture placeholder." action={<StatusBadge value="monitoring" />} />
          <PlaceholderChart data={analytics.riskTrend} suffix=" pts" />
        </Panel>

        <Panel>
          <SectionTitle title="Layer health summary" description="Current operating state across the protection stack." />
          <div className="space-y-3">
            {layerHealthStatuses.slice(0, 6).map((layer) => (
              <div key={layer.layerId} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    {layer.layerId
                      .split("-")
                      .map((part) => part[0]?.toUpperCase() + part.slice(1))
                      .join(" ")}
                  </div>
                  <div className="text-xs text-text-muted">
                    {layer.uptime} uptime · {layer.latency} p95 latency
                  </div>
                </div>
                <HealthIndicator status={layer.status} />
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Panel>
          <SectionTitle title="Recent events" description="Latest security signals from monitored endpoints." />
          <div className="space-y-3">
            {securityEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="flex flex-col gap-3 border-b border-border/60 pb-3 last:border-b-0 last:pb-0 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <SeverityBadge severity={event.severity} />
                    <span className="text-sm font-medium text-text-primary">{event.type}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{event.projectName} · {event.layerName} · <code>{event.endpoint}</code></p>
                </div>
                <div className="text-xs text-text-muted">{event.timestamp}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionTitle title="Top risky endpoints" description="Endpoints ranked by current attack pressure." />
          <div className="space-y-3">
            {analytics.endpointRiskRanking.slice(0, 5).map((item, index) => (
              <div key={item.endpoint} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    {index + 1}. <code>{item.endpoint}</code>
                  </div>
                  <div className="text-xs text-text-muted">{item.events} events linked in the current window</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-text-primary">{item.risk}</div>
                  <div className="text-xs text-text-muted">risk</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        {projects.map((project) => (
          <Card key={project.id} className="glass border border-border/70 bg-surface/78">
            <CardHeader className="border-b border-border/60">
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{project.name}</CardTitle>
                <StatusBadge value={project.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Risk Score</div>
                  <div className="mt-1 text-xl font-semibold text-text-primary">{project.riskScore}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Layers</div>
                  <div className="mt-1 text-xl font-semibold text-text-primary">{project.activeLayersCount}</div>
                </div>
              </div>
              <div className="text-xs text-text-secondary">{project.eventsCount.toLocaleString()} events · {project.primaryEndpoint}</div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
