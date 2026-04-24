import { Button } from "@my-better-t-app/ui/components/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Database, KeyRound, LockKeyhole, Route as RouteIcon, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

import { CodeBlock } from "@/features/dashboard/components/CodeBlock";
import { PageIntro, Panel, SectionTitle, ToggleSwitch } from "@/features/dashboard/components/DashboardPrimitives";
import { SeverityBadge } from "@/features/dashboard/components/SeverityBadge";
import { securityLayers } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/layers/configure")({
  component: LayerConfigurationPage,
});

const subscriptionLimits = {
  Starter: 4,
  Growth: 5,
  Enterprise: 5,
} as const;

const defaultRoutes = ["/api/private/*", "/internal/*", "/api/customers/export", "/webhooks/provider"];

function LayerConfigurationPage() {
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof subscriptionLimits>("Growth");
  const [selectedLayers, setSelectedLayers] = useState<Record<string, boolean>>(
    Object.fromEntries(securityLayers.slice(0, 5).map((layer) => [layer.id, true])),
  );

  const activeLayers = useMemo(
    () => securityLayers.filter((layer) => selectedLayers[layer.id]),
    [selectedLayers],
  );
  const datasetLimit = subscriptionLimits[selectedPlan];

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Layer configuration"
        title="Bind layers to private routes and datasets"
        description="Configure route patterns, selected layers, API credentials, and dataset limits from one workspace before enforcement."
        actions={
          <Link to="/secure">
            <Button variant="outline" size="sm">
              <LockKeyhole />
              Analyze URL
            </Button>
          </Link>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <SectionTitle title="Subscription dataset capacity" description="Every enabled layer can protect datasets according to plan limits." />
          <div className="grid gap-3 md:grid-cols-3">
            {Object.entries(subscriptionLimits).map(([plan, limit]) => (
              <button
                key={plan}
                type="button"
                onClick={() => setSelectedPlan(plan as keyof typeof subscriptionLimits)}
                className={`border px-4 py-3 text-left transition-colors ${
                  selectedPlan === plan
                    ? "border-primary/45 bg-primary/12 text-text-primary"
                    : "border-border/70 bg-background/35 text-text-secondary hover:border-primary/25"
                }`}
              >
                <div className="text-sm font-medium">{plan}</div>
                <div className="mt-1 text-xs">{limit} datasets per layer</div>
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Metric icon={ShieldCheck} label="Active layers" value={String(activeLayers.length)} />
            <Metric icon={Database} label="Dataset slots" value={String(activeLayers.length * datasetLimit)} />
            <Metric icon={RouteIcon} label="Route groups" value={String(defaultRoutes.length)} />
          </div>
        </Panel>

        <Panel>
          <SectionTitle title="API key submission" description="Keys should be submitted once per project and stored outside source control." />
          <div className="space-y-3">
            <Field label="Project API key" placeholder="sl_live_project_key" icon={KeyRound} />
            <Field label="Project ID" placeholder="atlas-pay" icon={ShieldCheck} />
            <Field label="Environment" placeholder="production" icon={RouteIcon} />
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Panel>
          <SectionTitle title="Route patterns" description="Routes submitted from /secure can be reviewed here before layer enforcement." />
          <div className="space-y-3">
            {defaultRoutes.map((route) => (
              <div key={route} className="flex items-center justify-between gap-3 border border-border/70 bg-background/35 px-3 py-3">
                <code className="text-sm text-text-secondary">{route}</code>
                <ToggleSwitch checked />
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionTitle title="Layer selection" description="Choose which wrappers protect the route groups and reusable datasets." />
          <div className="space-y-3">
            {securityLayers.map((layer) => (
              <div key={layer.id} className="flex items-start justify-between gap-3 border border-border/70 bg-background/35 px-3 py-3">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-text-primary">{layer.name}</span>
                    <SeverityBadge severity={layer.severity} />
                  </div>
                  <p className="text-xs leading-5 text-text-secondary">{layer.routeUseCase}</p>
                </div>
                <ToggleSwitch
                  checked={Boolean(selectedLayers[layer.id])}
                  onChange={(value) => setSelectedLayers((state) => ({ ...state, [layer.id]: value }))}
                  label={`${layer.name} selected`}
                />
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel>
          <SectionTitle title="Codebase setup ideas" description="Recommended places to attach route layers." />
          <div className="space-y-3 text-sm leading-7 text-text-secondary">
            <p>Attach middleware before private route handlers so requests are evaluated before business logic runs.</p>
            <p>Keep dataset mappings in project configuration, not scattered across handlers.</p>
            <p>Use route groups for admin, exports, webhooks, auth, and internal tooling so teams can reason about coverage.</p>
          </div>
        </Panel>

        <Panel>
          <SectionTitle title="Configuration example" description="A shape the backend can later persist per project." />
          <CodeBlock
            title="layer-config.json"
            code={`{
  "plan": "${selectedPlan}",
  "datasetsPerLayer": ${datasetLimit},
  "routes": ${JSON.stringify(defaultRoutes, null, 2)},
  "layers": ${JSON.stringify(activeLayers.map((layer) => layer.id), null, 2)}
}`}
          />
          <div className="mt-4 flex justify-end">
            <Button size="sm">
              Save Configuration
              <ArrowRight />
            </Button>
          </div>
        </Panel>
      </section>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-border/70 bg-background/35 p-3">
      <Icon className="mb-3 size-4 text-primary" />
      <div className="text-xl font-semibold text-text-primary">{value}</div>
      <div className="text-xs text-text-secondary">{label}</div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  icon: Icon,
}: {
  label: string;
  placeholder: string;
  icon: LucideIcon;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.16em] text-text-muted">{label}</span>
      <span className="flex items-center gap-2 border border-border/70 bg-background/35 px-3 py-2">
        <Icon className="size-4 text-primary" />
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          placeholder={placeholder}
        />
      </span>
    </label>
  );
}
