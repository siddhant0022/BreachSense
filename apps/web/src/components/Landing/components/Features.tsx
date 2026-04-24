import LayerCard from "./LayerCard";

export default function Features() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl mb-8">
        Security Layers
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
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