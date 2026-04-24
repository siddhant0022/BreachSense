import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data) {
      redirect({
        to: "/login",
        throw: true,
      });
    }
    return { session };
  },
});

function RouteComponent() {
  const { session } = Route.useRouteContext();

  const privateData = useQuery(trpc.privateData.queryOptions());

  return (
    <div className="theme-shell min-h-full px-6 py-10">
      <div className="glass glow mx-auto max-w-4xl border border-border/70 p-8">
        <p className="mb-2 text-xs tracking-[0.22em] text-primary">BREACHSENSE CONSOLE</p>
        <h1 className="mb-4 text-4xl font-bold text-text-primary">Dashboard</h1>
        <p className="mb-2 text-text-secondary">Welcome {session.data?.user.name}</p>
        <p className="text-text-muted">API: {privateData.data?.message}</p>
      </div>
    </div>
  );
}
