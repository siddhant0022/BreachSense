import { Button } from "@my-better-t-app/ui/components/button";
import { Input } from "@my-better-t-app/ui/components/input";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  PageIntro,
  Panel,
  SectionTitle,
  ToggleSwitch,
} from "@/features/dashboard/components/DashboardPrimitives";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";
import { projects, teamMembers } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [autoMute, setAutoMute] = useState(false);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Workspace settings"
        title="Settings"
        description="Configure organization defaults, team access, and notification preferences. All controls are UI only."
      />

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel className="space-y-4">
          <SectionTitle title="Organization settings" />
          <div className="grid gap-3 md:grid-cols-2">
            <Input defaultValue="BreachSense" />
            <Input defaultValue="security.breachsense.dev" />
            <Input defaultValue="Asia/Calcutta" />
            <Input defaultValue="Enterprise" />
          </div>
          <Button size="sm">Save Organization Settings</Button>
        </Panel>

        <Panel className="space-y-4">
          <SectionTitle title="Default project settings" />
          <div className="space-y-3 text-sm text-text-secondary">
            <div className="border border-border/70 p-3">
              Default project: <span className="text-text-primary">{projects[0]?.name}</span>
            </div>
            <div className="border border-border/70 p-3">
              Baseline layer pack: <span className="text-text-primary">Secure API Core</span>
            </div>
            <div className="border border-border/70 p-3">
              Incident routing: <span className="text-text-primary">Security on-call</span>
            </div>
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel className="space-y-4">
          <SectionTitle title="Members" description="Team access overview." />
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                <div>
                  <div className="text-sm font-medium text-text-primary">{member.name}</div>
                  <div className="text-xs text-text-secondary">{member.role} · {member.email}</div>
                </div>
                <StatusBadge value={member.status} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="space-y-4">
          <SectionTitle title="Notification preferences" />
          <div className="space-y-3">
            <div className="flex items-center justify-between border border-border/70 px-3 py-3">
              <div>
                <div className="text-sm font-medium text-text-primary">Email alerts</div>
                <div className="text-xs text-text-secondary">Receive incident summaries by email.</div>
              </div>
              <ToggleSwitch checked={emailAlerts} onChange={setEmailAlerts} />
            </div>
            <div className="flex items-center justify-between border border-border/70 px-3 py-3">
              <div>
                <div className="text-sm font-medium text-text-primary">Slack alerts</div>
                <div className="text-xs text-text-secondary">Route alerts to team chat channels.</div>
              </div>
              <ToggleSwitch checked={slackAlerts} onChange={setSlackAlerts} />
            </div>
            <div className="flex items-center justify-between border border-border/70 px-3 py-3">
              <div>
                <div className="text-sm font-medium text-text-primary">Auto-mute low severity</div>
                <div className="text-xs text-text-secondary">Reduce noise outside business hours.</div>
              </div>
              <ToggleSwitch checked={autoMute} onChange={setAutoMute} />
            </div>
          </div>
        </Panel>
      </section>

      <Panel className="space-y-4 border-danger/25">
        <SectionTitle title="Danger zone" description="High-impact actions rendered as UI only." />
        <div className="flex flex-col gap-3 border border-danger/25 bg-danger/7 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-medium text-text-primary">Archive organization workspace</div>
            <div className="text-xs text-text-secondary">Suspend dashboards, keys, and alerting integrations.</div>
          </div>
          <Button variant="destructive" size="sm">Archive Workspace</Button>
        </div>
      </Panel>
    </div>
  );
}
