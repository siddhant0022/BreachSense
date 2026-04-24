import { Button } from "@my-better-t-app/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { CodeBlock, InlineKeyValue } from "@/features/dashboard/components/CodeBlock";
import { PageIntro, Panel, SectionTitle } from "@/features/dashboard/components/DashboardPrimitives";
import { implementationChecklist } from "@/features/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/implementation")({
  component: ImplementationPage,
});

const installCommand = `bun add @securelayer/sdk`;
const middlewareExample = `import { secureLayer } from "@securelayer/sdk";

app.use(
  secureLayer({
    apiKey: process.env.SECURE_LAYER_API_KEY,
    projectId: process.env.SECURE_LAYER_PROJECT_ID,
  })
);`;

function ImplementationPage() {
  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Implementation"
        title="Ship the SDK with confidence"
        description="Everything the platform expects from a project integration, from installation through connection verification."
        actions={<Button size="sm">Verify Connection</Button>}
      />

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel className="space-y-4">
          <SectionTitle title="Install command" description="Use the package manager shown in the product requirements." />
          <CodeBlock title="Install" code={installCommand} />

          <SectionTitle title="Middleware example" description="Attach the security middleware before your application routes." />
          <CodeBlock title="App middleware" code={middlewareExample} />
        </Panel>

        <Panel className="space-y-2">
          <SectionTitle title="Environment variables" description="Project-scoped credentials required by the SDK." />
          <InlineKeyValue label="SECURE_LAYER_API_KEY" value="Provisioned project API key" />
          <InlineKeyValue label="SECURE_LAYER_PROJECT_ID" value="Stable BreachSense project identifier" />
          <InlineKeyValue label="Runtime placement" value="Set before the API server starts" />
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <SectionTitle title="API key usage" description="Keys are scoped by project and attached in middleware configuration." />
          <CodeBlock
            title="Credential shape"
            code={`SECURE_LAYER_API_KEY=sl_live_project_••••\nSECURE_LAYER_PROJECT_ID=atlas-pay`}
          />
        </Panel>

        <Panel>
          <SectionTitle title="Setup checklist" description="Use this as the implementation handoff checklist." />
          <div className="space-y-3">
            {implementationChecklist.map((item) => (
              <div key={item} className="flex items-start gap-3 border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                <CheckCircle2 className="mt-0.5 size-4 text-success" />
                <span className="text-sm text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
