import { Button } from "@my-better-t-app/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CopyChip } from "@/features/dashboard/components/DashboardPrimitives";
import { PageIntro, Panel } from "@/features/dashboard/components/DashboardPrimitives";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";
import { apiKeys as seedApiKeys } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/api-keys")({
  component: ApiKeysPage,
});

function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState(seedApiKeys);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Access control"
        title="API keys"
        description="Review project-scoped keys, recent activity, and revocation state. This is a frontend-only management surface."
        actions={<Button size="sm">Create API Key</Button>}
      />

      <div className="space-y-3">
        {apiKeys.map((key) => (
          <Panel key={key.id} className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-text-primary">{key.name}</h3>
                  <StatusBadge value={key.status} />
                </div>
                <div className="text-sm text-text-secondary">{key.projectName}</div>
                <code className="text-sm text-text-primary">{key.maskedKey}</code>
              </div>
              <div className="grid gap-3 text-sm md:grid-cols-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Created</div>
                  <div className="mt-1 text-text-primary">{key.createdDate}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-text-muted">Last used</div>
                  <div className="mt-1 text-text-primary">{key.lastUsed}</div>
                </div>
                <div className="flex items-end gap-2">
                  <CopyChip value={key.maskedKey} />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      setApiKeys((keys) =>
                        keys.map((item) => (item.id === key.id ? { ...item, status: "revoked" } : item)),
                      )
                    }
                  >
                    Revoke
                  </Button>
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
