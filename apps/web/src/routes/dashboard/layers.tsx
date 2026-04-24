import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { LayerCard } from "@/features/dashboard/components/LayerCard";
import { PageIntro } from "@/features/dashboard/components/DashboardPrimitives";
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
        eyebrow="Layer catalogue"
        title="Security layers"
        description="Browse the protection modules available to your organization and preview which controls are currently enabled."
      />

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
