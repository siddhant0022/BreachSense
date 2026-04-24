import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AlertList } from "@/features/dashboard/components/AlertList";
import { PageIntro } from "@/features/dashboard/components/DashboardPrimitives";
import { alerts as seedAlerts } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/alerts")({
  component: AlertsPage,
});

function AlertsPage() {
  const [alertState, setAlertState] = useState(seedAlerts);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Alert center"
        title="Alerts"
        description="Escalations, triage status, and signal ownership collected into one operational queue."
      />

      <AlertList
        alerts={alertState}
        onMarkRead={(alertId) =>
          setAlertState((alerts) =>
            alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "investigating" } : alert)),
          )
        }
        onResolve={(alertId) =>
          setAlertState((alerts) =>
            alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)),
          )
        }
      />
    </div>
  );
}
