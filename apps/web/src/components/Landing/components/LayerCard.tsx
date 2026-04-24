export default function LayerCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="glass rounded-xl border border-border/70 p-6 transition hover:-translate-y-1 hover:border-primary/25">
      <h3 className="mb-2 text-lg text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary">{desc}</p>
    </div>
  );
}
