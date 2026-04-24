import LayerCard from "./LayerCard";

export default function Features() {
  return (
    <section id="layers" className="mx-auto max-w-7xl scroll-mt-28 px-8 py-24">
      <h2 className="mb-8 text-3xl text-text-primary">
        Security Layers
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <LayerCard
          title="Threat Detection"
          desc="Detect suspicious activity in real-time."
        />
        <LayerCard
          title="Encryption"
          desc="Secure your data end-to-end."
        />
        <LayerCard
          title="Access Control"
          desc="Manage who can access what."
        />
      </div>
    </section>
  );
}
