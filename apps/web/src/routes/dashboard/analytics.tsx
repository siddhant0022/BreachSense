import { Card, CardContent, CardHeader, CardTitle } from "@my-better-t-app/ui/components/card";
import { createFileRoute } from "@tanstack/react-router";

import {
  PageIntro,
  Panel,
  PlaceholderChart,
  SectionTitle,
} from "@/features/dashboard/components/DashboardPrimitives";
import { analytics } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Analytics"
        title="Security analytics"
        description="Trend-level visibility for posture, endpoint risk concentration, and layer effectiveness."
      />

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <SectionTitle title="Risk score trend" description="Mock placeholder ready to swap with a chart library later." />
          <PlaceholderChart data={analytics.riskTrend} suffix=" pts" />
        </Panel>
        <Panel>
          <SectionTitle title="Events over time" description="24-hour event volume placeholder." />
          <PlaceholderChart data={analytics.eventsOverTime} accent="var(--primary-glow)" />
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <SectionTitle title="Layer performance" description="How each protection layer is performing against observed traffic." />
          <div className="grid gap-3 md:grid-cols-2">
            {analytics.layerPerformance.map((layer) => (
              <Card key={layer.layerId} className="border border-border/70 bg-background/35">
                <CardHeader>
                  <CardTitle>{layer.layerName}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Blocked</div>
                    <div className="mt-1 text-lg font-semibold text-text-primary">{layer.blocked}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-text-muted">False positives</div>
                    <div className="mt-1 text-lg font-semibold text-text-primary">{layer.falsePositives}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Latency</div>
                    <div className="mt-1 text-lg font-semibold text-text-primary">{layer.latency}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionTitle title="Endpoint risk ranking" description="Routes under the highest security pressure." />
          <div className="space-y-3">
            {analytics.endpointRiskRanking.map((item) => (
              <div key={item.endpoint} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                <div>
                  <div className="text-sm font-medium text-text-primary"><code>{item.endpoint}</code></div>
                  <div className="text-xs text-text-muted">{item.events} events in the current range</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold text-text-primary">{item.risk}</div>
                  <div className="text-xs text-text-muted">risk</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Panel>
          <SectionTitle title="PII leak trend" description="Weekly trend placeholder." />
          <PlaceholderChart data={analytics.piiLeakTrend} accent="var(--danger)" />
        </Panel>

        <Panel>
          <SectionTitle title="Security score breakdown" description="Weighted categories contributing to the overall score." />
          <div className="space-y-3">
            {analytics.securityScoreBreakdown.map((segment) => (
              <div key={segment.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-primary">{segment.label}</span>
                  <span className="text-text-secondary">{segment.score}/100</span>
                </div>
                <div className="h-2 overflow-hidden rounded-sm bg-background/55">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${segment.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
