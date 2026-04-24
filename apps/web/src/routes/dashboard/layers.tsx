import { Button } from "@my-better-t-app/ui/components/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { ArrowRight, Database, FileText, KeyRound, Route as RouteIcon, ShieldCheck } from "lucide-react";

import { LayerCard } from "@/features/dashboard/components/LayerCard";
import { CodeBlock } from "@/features/dashboard/components/CodeBlock";
import { PageIntro, Panel, SectionTitle } from "@/features/dashboard/components/DashboardPrimitives";
import { securityLayers } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/layers")({
  component: LayersPage,
});

function LayersPage() {
  const [enabledState, setEnabledState] = useState<Record<string, boolean>>(
    Object.fromEntries(securityLayers.map((layer) => [layer.id, layer.enabled])),
  );

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Main protection hub"
        title="Route-specific layers for reusable dataset security"
        description="Browse protection layers that can be attached to routes, middleware, and datasets. Each layer works like a security wrapper around the data path so teams can protect the same dataset across multiple endpoints."
        actions={
          <>
            <Link to="/secure">
              <Button variant="outline" size="sm">
                <ShieldCheck />
                Secure URL
              </Button>
            </Link>
            <Link to="/dashboard/layers/configure">
              <Button size="sm">
                Configure Layers
                <ArrowRight />
              </Button>
            </Link>
          </>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel className="space-y-4">
          <SectionTitle
            title="How layers protect routes"
            description="Use the catalogue as the entry point for choosing coverage before binding layers to route groups."
          />
          <div className="grid gap-3 md:grid-cols-3">
            <WorkflowStep icon={RouteIcon} title="Route wrapper" body="Attach a layer to private APIs, public endpoints, admin routes, or middleware groups." />
            <WorkflowStep icon={Database} title="Dataset reuse" body="Bind one layer to four or five datasets depending on the active subscription plan." />
            <WorkflowStep icon={FileText} title="Evidence trail" body="Log detections, severity, route context, and remediation notes for every protected path." />
          </div>
        </Panel>

        <Panel className="space-y-4">
          <SectionTitle title="Install and key setup" description="The minimum setup required before route configuration." />
          <CodeBlock
            title="SDK setup"
            code={`bun add @securelayer/sdk\n\nSECURE_LAYER_API_KEY=sl_live_project_key\nSECURE_LAYER_PROJECT_ID=project_id\n\n// Submit keys from Dashboard > API Keys, then bind layers from this page.`}
          />
          <div className="grid gap-2 text-sm text-text-secondary">
            <DocRow icon={KeyRound} text="Generate a project-scoped key from API Keys." />
            <DocRow icon={RouteIcon} text="Register route patterns such as /api/private/* or /internal/*." />
            <DocRow icon={Database} text="Map protected datasets before turning on enforcement." />
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {securityLayers.map((layer) => (
          <LayerCard
            key={layer.id}
            layer={layer}
            enabled={enabledState[layer.id] ?? layer.enabled}
            onToggle={(value) => setEnabledState((state) => ({ ...state, [layer.id]: value }))}
          />
        ))}
      </section>
    </div>
  );
}

function WorkflowStep({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="border border-border/70 bg-background/35 p-3">
      <div className="mb-3 flex size-9 items-center justify-center border border-primary/20 bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>
      <h2 className="text-sm font-medium text-text-primary">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-text-secondary">{body}</p>
    </div>
  );
}

function DocRow({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-start gap-2 border border-border/60 bg-background/30 px-3 py-2">
      <Icon className="mt-0.5 size-4 text-primary" />
      <span>{text}</span>
    </div>
  );
}
