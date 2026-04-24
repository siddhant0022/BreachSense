import { Button } from "@my-better-t-app/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CodeBlock } from "@/features/dashboard/components/CodeBlock";
import { HealthIndicator } from "@/features/dashboard/components/HealthIndicator";
import {
  PageIntro,
  Panel,
  SectionTitle,
  ToggleSwitch,
} from "@/features/dashboard/components/DashboardPrimitives";
import { SeverityBadge } from "@/features/dashboard/components/SeverityBadge";
import { getLayerById } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/layers/$layerId")({
  component: LayerDetailPage,
});

function LayerDetailPage() {
  const { layerId } = Route.useParams();
  const layer = getLayerById(layerId);
  const [enabled, setEnabled] = useState(layer?.enabled ?? false);

  if (!layer) {
    return <div className="text-sm text-text-secondary">Layer not found.</div>;
  }

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Layer detail"
        title={layer.name}
        description={layer.description}
        actions={
          <>
            <SeverityBadge severity={layer.severity} />
            <HealthIndicator status={layer.healthStatus} />
          </>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Panel className="space-y-4">
          <SectionTitle title="Detection profile" description={`${layer.category} · ${layer.plan} plan`} />
          <div className="grid gap-3 md:grid-cols-2">
            {layer.detects.map((detection) => (
              <div key={detection} className="border border-border/70 bg-background/35 px-3 py-3 text-sm text-text-secondary">
                {detection}
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="space-y-4">
          <SectionTitle title="Controls" description="UI-only actions for future layer management." />
          <div className="flex items-center justify-between border border-border/70 px-3 py-3">
            <div>
              <div className="text-sm font-medium text-text-primary">Enabled state</div>
              <div className="text-xs text-text-secondary">Toggle the layer on or off.</div>
            </div>
            <ToggleSwitch checked={enabled} onChange={setEnabled} />
          </div>
          <Button size="sm">Test Layer</Button>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <SectionTitle title="Configuration preview" description="Mock configuration that can later be backed by live layer settings." />
          <CodeBlock
            title="Layer config"
            code={layer.configurationPreview.map((line) => `${line}`).join("\n")}
          />
        </Panel>

        <Panel>
          <SectionTitle title="Recent detections" description="Latest detections attributed to this layer." />
          <div className="space-y-3">
            {layer.recentDetections.map((detection) => (
              <div key={detection.id} className="border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <SeverityBadge severity={detection.severity} />
                  <span className="text-sm font-medium text-text-primary">{detection.title}</span>
                </div>
                <div className="text-sm text-text-secondary">
                  <code>{detection.endpoint}</code>
                </div>
                <div className="mt-1 text-xs text-text-muted">{detection.timestamp}</div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
