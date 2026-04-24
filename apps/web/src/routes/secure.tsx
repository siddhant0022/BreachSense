import { Button } from "@my-better-t-app/ui/components/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, ArrowRight, Database, LockKeyhole, Radar, Route as RouteIcon, ShieldCheck } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { PageIntro, Panel, SectionTitle } from "@/features/dashboard/components/DashboardPrimitives";
import { SeverityBadge } from "@/features/dashboard/components/SeverityBadge";
import { securityLayers } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/secure")({
  component: SecureRoutePage,
});

const routeSignals = [
  { token: "admin", label: "Admin route exposure", severity: "critical" as const },
  { token: "internal", label: "Internal service access", severity: "high" as const },
  { token: "export", label: "Bulk data export", severity: "high" as const },
  { token: "customer", label: "Customer dataset access", severity: "high" as const },
  { token: "auth", label: "Identity and session surface", severity: "critical" as const },
  { token: "webhook", label: "Webhook trust boundary", severity: "medium" as const },
  { token: "debug", label: "Debug information leakage", severity: "critical" as const },
  { token: "graphql", label: "Broad query/mutation surface", severity: "high" as const },
];

function SecureRoutePage() {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("/internal/customers/export");

  const assessment = useMemo(() => assessRoute(submittedUrl), [submittedUrl]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedUrl(url.trim() || "/internal/customers/export");
  }

  return (
    <main className="theme-shell min-h-full px-4 py-6 text-text-primary lg:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <PageIntro
          eyebrow="Secure private URL"
          title="Evaluate routes before you publish or share them"
          description="Submit a not-so-public URL, internal endpoint, or private route. BreachSense estimates vulnerability possibilities and data criticality, then routes the configuration work into the layers dashboard."
          actions={
            <Link to="/dashboard/layers">
              <Button variant="outline" size="sm">
                <ShieldCheck />
                Browse Layers
              </Button>
            </Link>
          }
        />

        <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <Panel className="space-y-4">
            <SectionTitle title="Route intake" description="Use a full URL or route pattern. Keep secrets and tokens out of the submitted URL." />
            <form className="space-y-4" onSubmit={onSubmit}>
              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Private URL or route</span>
                <span className="flex items-center gap-2 border border-border/70 bg-background/35 px-3 py-3">
                  <LockKeyhole className="size-4 text-primary" />
                  <input
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                    placeholder="/internal/customers/export"
                  />
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                <Button type="submit">
                  Evaluate Route
                  <Radar />
                </Button>
                <Link to="/dashboard/layers/configure">
                  <Button type="button" variant="outline">
                    Configure Layers
                    <ArrowRight />
                  </Button>
                </Link>
              </div>
            </form>
          </Panel>

          <Panel>
            <SectionTitle title="Assessment summary" description={`Current route: ${submittedUrl}`} />
            <div className="grid gap-3 sm:grid-cols-3">
              <SummaryMetric icon={AlertTriangle} label="Risk score" value={`${assessment.score}/100`} />
              <SummaryMetric icon={Database} label="Data criticality" value={assessment.criticality} />
              <SummaryMetric icon={RouteIcon} label="Signals" value={String(assessment.signals.length)} />
            </div>
            <div className="mt-4 space-y-3">
              {assessment.signals.map((signal) => (
                <div key={signal.label} className="flex items-start justify-between gap-3 border border-border/70 bg-background/35 px-3 py-3">
                  <span className="text-sm text-text-secondary">{signal.label}</span>
                  <SeverityBadge severity={signal.severity} />
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel>
            <SectionTitle title="Recommended layers" description="These layers match the route signals and can be configured next." />
            <div className="space-y-3">
              {assessment.recommendedLayers.map((layer) => (
                <Link
                  key={layer.id}
                  to="/dashboard/layers/$layerId"
                  params={{ layerId: layer.id }}
                  className="block border border-border/70 bg-background/35 px-3 py-3 transition-colors hover:border-primary/35 hover:bg-primary/8"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-medium text-text-primary">{layer.name}</span>
                    <SeverityBadge severity={layer.severity} />
                  </div>
                  <p className="text-xs leading-5 text-text-secondary">{layer.routeUseCase}</p>
                </Link>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionTitle title="Protection path" description="Move from route assessment into layer configuration." />
            <div className="grid gap-3 md:grid-cols-3">
              <PathStep index="1" title="Assess" body="Estimate vulnerability and data criticality for the private route." />
              <PathStep index="2" title="Choose" body="Select layers that cover the matched route and dataset signals." />
              <PathStep index="3" title="Configure" body="Bind four to five datasets per layer based on the subscription plan." />
            </div>
            <div className="mt-4 flex justify-end">
              <Link to="/dashboard/layers/configure">
                <Button>
                  Continue to Configuration
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </Panel>
        </section>
      </div>
    </main>
  );
}

function assessRoute(route: string) {
  const value = route.toLowerCase();
  const signals = routeSignals.filter((signal) => value.includes(signal.token));
  const fallbackSignals = signals.length ? signals : [
    { token: "private", label: "Private route requires baseline protection", severity: "medium" as const },
  ];
  const score = Math.min(96, 34 + fallbackSignals.length * 13 + (value.includes("https://") ? 4 : 0));
  const criticality = score > 74 ? "High" : score > 54 ? "Medium" : "Low";
  const recommendedLayers = securityLayers
    .filter((layer) => {
      const haystack = `${layer.name} ${layer.routeUseCase} ${layer.vulnerabilities.join(" ")}`.toLowerCase();
      return fallbackSignals.some((signal) => haystack.includes(signal.token)) || layer.severity === "critical";
    })
    .slice(0, 4);

  return {
    score,
    criticality,
    signals: fallbackSignals,
    recommendedLayers,
  };
}

function SummaryMetric({
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

function PathStep({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <div className="border border-border/70 bg-background/35 p-4">
      <div className="mb-3 flex size-8 items-center justify-center border border-primary/20 bg-primary/10 text-sm text-primary">
        {index}
      </div>
      <h2 className="text-sm font-medium text-text-primary">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-text-secondary">{body}</p>
    </div>
  );
}
