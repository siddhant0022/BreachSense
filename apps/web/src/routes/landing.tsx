import { Button } from "@my-better-t-app/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@my-better-t-app/ui/components/card";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Blocks,
  Database,
  KeyRound,
  Radar,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { HealthIndicator } from "@/features/dashboard/components/HealthIndicator";
import { SeverityBadge } from "@/features/dashboard/components/SeverityBadge";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";
import { securityLayers } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/landing")({
  component: LandingRoute,
});

const workflow = [
  "Company signs up",
  "Creates organization or workspace",
  "Creates project",
  "Chooses protective layers",
  "Generates API key",
  "Installs SDK or plugin",
  "Connects layers to routes, middleware, or datasets",
  "Layer checks requests and data access",
  "Unauthorized or risky access is blocked or reported",
  "Dashboard shows events, alerts, and health status",
];

const audience = [
  "Startups shipping fast without dedicated security engineers",
  "SaaS teams protecting customer and internal business data",
  "Backend teams that need route-level and middleware-level coverage",
  "Companies handling financial, healthcare, or user identity records",
];

const painPoints = [
  "Unauthorized users accessing protected data",
  "APIs without proper access control",
  "Sensitive data leaking in API responses",
  "Weak middleware protection and poor route visibility",
  "No clear view into who accessed what data and when",
];

function LandingRoute() {
  return (
    <main className="theme-shell min-h-screen text-text-primary">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-35" />

      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-primary">Protective Layer System</p>
            <p className="text-sm text-text-secondary">Developer-first API security layers</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                Open Dashboard
              </Button>
            </Link>
            <Link to="/home">
              <Button size="sm">
                View Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-18 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/8 px-3 py-2 text-xs uppercase tracking-[0.22em] text-primary">
            <Radar className="size-4" />
            Sentry for API security and data protection
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-text-primary md:text-7xl">
              Modular protection layers for APIs, routes, middleware, and data access.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-text-secondary md:text-xl">
              Protective Layer System is a plug-and-play API security platform for teams that need
              serious coverage without rebuilding their backend or hiring a full security function.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/dashboard/layers">
              <Button size="lg">
                Browse Layers
                <ArrowRight />
              </Button>
            </Link>
            <Link to="/dashboard/implementation">
              <Button variant="outline" size="lg">
                See Integration Flow
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <HeroMetric icon={Blocks} label="Protection modules" value={String(securityLayers.length)} />
            <HeroMetric icon={ShieldCheck} label="High or critical layers" value={String(securityLayers.filter((layer) => layer.severity === "high" || layer.severity === "critical").length)} />
            <HeroMetric icon={Activity} label="Operational posture" value="Live dashboard ready" />
          </div>
        </div>

        <div className="glass glow overflow-hidden border border-border/70 bg-surface/82 p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Core workflow</p>
              <h2 className="mt-2 text-2xl font-semibold text-text-primary">How teams adopt it</h2>
            </div>
            <StatusBadge value="monitoring" />
          </div>
          <div className="space-y-3">
            {workflow.slice(0, 6).map((step, index) => (
              <div key={step} className="flex items-start gap-3 border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                <div className="flex size-7 shrink-0 items-center justify-center border border-primary/20 bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-text-secondary">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-6 lg:grid-cols-[1fr_1fr_1fr]">
        <InfoCard
          icon={Database}
          title="Main problem"
          body="Companies expose sensitive data through APIs, admin panels, internal services, and database-backed workflows without enough route-level or response-level control."
        />
        <InfoCard
          icon={Workflow}
          title="Main solution"
          body="Choose protective layers, attach them through SDKs or middleware, then monitor events, alerts, and health from one dashboard."
        />
        <InfoCard
          icon={KeyRound}
          title="Developer-first positioning"
          body="This is not a generic cybersecurity suite. It is a modular API security layer system designed for engineering teams."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Audience</p>
          <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
            Built for companies that need protection now, not after a long security rewrite.
          </h2>
          <p className="text-lg text-text-secondary">
            The platform is aimed at teams that handle important data but want integration to feel
            closer to Stripe or Sentry than a heavy security rollout.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {audience.map((item) => (
            <Card key={item} className="glass border border-border/70 bg-surface/78">
              <CardContent className="pt-5 text-sm leading-7 text-text-secondary">{item}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Problem Surface</p>
          <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
            The gaps teams usually discover too late.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {painPoints.map((point) => (
            <div key={point} className="border border-border/70 bg-background/35 p-4 text-sm leading-7 text-text-secondary">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 max-w-4xl space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Shared Layers</p>
          <h2 className="text-3xl font-semibold text-text-primary md:text-5xl">
            Every protective layer, surfaced in one public catalogue.
          </h2>
          <p className="text-lg text-text-secondary">
            Each module protects against a specific risk and can later map directly to SDK or
            middleware-based integration flows inside the product dashboard.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {securityLayers.map((layer) => (
            <Card key={layer.id} className="glass border border-border/70 bg-surface/80">
              <CardHeader className="border-b border-border/60">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-text-primary">{layer.name}</CardTitle>
                    <p className="max-w-2xl text-sm leading-7 text-text-secondary">{layer.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <SeverityBadge severity={layer.severity} />
                    <StatusBadge value={layer.enabled ? "active" : "inactive"} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-5">
                <div className="flex flex-wrap gap-2">
                  <span className="border border-border/70 px-2 py-1 text-xs uppercase tracking-[0.16em] text-text-secondary">
                    {layer.category}
                  </span>
                  <span className="border border-border/70 px-2 py-1 text-xs uppercase tracking-[0.16em] text-text-secondary">
                    {layer.plan}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <HealthIndicator status={layer.healthStatus} />
                  <Link to="/dashboard/layers/$layerId" params={{ layerId: layer.id }}>
                    <Button variant="outline" size="sm">
                      View in Dashboard
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {layer.detects.map((signal) => (
                    <div key={signal} className="border border-border/70 bg-background/35 px-3 py-3 text-sm text-text-secondary">
                      {signal}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="glass overflow-hidden border border-border/70 bg-surface/84 p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.24em] text-primary">Integration story</p>
              <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
                Choose protection, generate a key, connect the layer, monitor the result.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-text-secondary">
                The product experience is intentionally simple: create a project, generate an API
                key, install the SDK or plugin, attach layers to routes or datasets, and use the
                dashboard to watch threats, alerts, and health status.
              </p>
            </div>

            <div className="grid gap-3">
              {workflow.slice(6).map((step, index) => (
                <div key={step} className="border border-border/70 bg-background/30 px-4 py-4 text-sm text-text-secondary">
                  <span className="mr-2 text-primary">{index + 7}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: string;
}) {
  return (
    <div className="glass border border-border/70 bg-surface/75 p-4">
      <div className="mb-3 flex size-10 items-center justify-center border border-primary/20 bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>
      <div className="text-2xl font-semibold text-text-primary">{value}</div>
      <div className="mt-1 text-sm text-text-secondary">{label}</div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof ShieldCheck;
  title: string;
  body: string;
}) {
  return (
    <Card className="glass border border-border/70 bg-surface/80">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center border border-primary/20 bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-7 text-text-secondary">{body}</CardContent>
    </Card>
  );
}
