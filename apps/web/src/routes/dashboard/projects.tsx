import { Button } from "@my-better-t-app/ui/components/button";
import { Input } from "@my-better-t-app/ui/components/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderPlus } from "lucide-react";
import { useState } from "react";

import {
  DataTable,
  Modal,
  PageIntro,
  Panel,
  ToggleSwitch,
} from "@/features/dashboard/components/DashboardPrimitives";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";
import { projects } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Projects"
        title="Monitored projects"
        description="See which applications are connected, how much traffic they are producing, and where security coverage still needs to improve."
        actions={
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <FolderPlus />
            Create Project
          </Button>
        }
      />

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {projects.map((project) => (
          <Panel key={project.id} className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-lg font-semibold text-text-primary">{project.name}</div>
                <div className="text-sm text-text-secondary">{project.environment}</div>
              </div>
              <StatusBadge value={project.status} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Events</div>
                <div className="mt-1 text-lg font-semibold text-text-primary">{project.eventsCount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Risk</div>
                <div className="mt-1 text-lg font-semibold text-text-primary">{project.riskScore}</div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border/60 pt-3">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-text-muted">SDK Connected</div>
                <div className="mt-1 text-sm text-text-secondary">{project.sdkConnected ? "Online" : "Needs setup"}</div>
              </div>
              <Link to="/dashboard/projects/$projectId" params={{ projectId: project.id }}>
                <Button variant="outline" size="sm">
                  Open
                </Button>
              </Link>
            </div>
          </Panel>
        ))}
      </section>

      <Panel>
        <DataTable
          columns={["Project", "Status", "SDK", "Events", "Layers", "Risk Score", ""]}
          rows={projects.map((project) => [
            <div className="space-y-1">
              <div className="font-medium text-text-primary">{project.name}</div>
              <div className="text-xs text-text-muted">{project.environment}</div>
            </div>,
            <StatusBadge value={project.status} />,
            <StatusBadge value={project.sdkConnected ? "active" : "inactive"} />,
            project.eventsCount.toLocaleString(),
            String(project.activeLayersCount),
            <span className="text-text-primary">{project.riskScore}</span>,
            <Link to="/dashboard/projects/$projectId" params={{ projectId: project.id }}>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </Link>,
          ])}
        />
      </Panel>

      <Modal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Create project"
        description="UI-only modal for future onboarding flows."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.16em] text-text-muted">Project name</label>
            <Input placeholder="Example: Edge Gateway" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.16em] text-text-muted">Environment</label>
            <Input placeholder="Production" />
          </div>
          <div className="flex items-center justify-between border border-border/70 px-3 py-3">
            <div>
              <div className="text-sm font-medium text-text-primary">Enable default monitoring</div>
              <div className="text-xs text-text-secondary">Start with the recommended protection profile.</div>
            </div>
            <ToggleSwitch checked={monitoringEnabled} onChange={setMonitoringEnabled} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => setDialogOpen(false)}>
              Create Project
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
