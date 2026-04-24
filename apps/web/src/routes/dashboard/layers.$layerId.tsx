import { Button } from "@my-better-t-app/ui/components/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Database, Settings2 } from "lucide-react";
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
            <Link to="/dashboard/layers/configure">
              <Button size="sm">
                <Settings2 />
                Configure
              </Button>
            </Link>
          </>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Panel className="space-y-4">
          <SectionTitle title="Detection profile" description={`${layer.category} - ${layer.plan} plan`} />
          <p className="text-sm leading-7 text-text-secondary">{layer.routeUseCase}</p>
          <div className="grid gap-3 md:grid-cols-2">
            {layer.detects.map((detection) => (
              <div key={detection} className="border border-border/70 bg-background/35 px-3 py-3 text-sm text-text-secondary">
                {detection}
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="space-y-4">
          <SectionTitle title="Route controls" description="Configure this layer for route groups and reusable datasets." />
          <div className="flex items-center justify-between border border-border/70 px-3 py-3">
            <div>
              <div className="text-sm font-medium text-text-primary">Enabled state</div>
              <div className="text-xs text-text-secondary">Toggle the layer on or off.</div>
            </div>
            <ToggleSwitch checked={enabled} onChange={setEnabled} />
          </div>
          <Link to="/dashboard/layers/configure">
            <Button size="sm">Open Configuration</Button>
          </Link>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Panel>
          <SectionTitle title="Reusable datasets" description="A layer can secure four to five datasets depending on subscription limits." />
          <div className="grid gap-3 md:grid-cols-2">
            {layer.reusableDatasets.map((dataset) => (
              <div key={dataset} className="flex items-start gap-2 border border-border/70 bg-background/35 px-3 py-3">
                <Database className="mt-0.5 size-4 text-primary" />
                <span className="text-sm text-text-secondary">{dataset}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionTitle title="Vulnerability coverage" description="Primary weakness classes evaluated before enforcement." />
          <div className="space-y-3">
            {layer.vulnerabilities.map((item) => (
              <div key={item} className="border-b border-border/60 pb-3 text-sm text-text-secondary last:border-b-0 last:pb-0">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <SectionTitle title="Configuration preview" description="Mock configuration that can later be backed by live layer settings." />
          <CodeBlock
            title="Layer config"
            code={[...layer.configurationPreview, "", "setup:", ...layer.setupSteps.map((step) => `  - ${step}`)].join("\n")}
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
