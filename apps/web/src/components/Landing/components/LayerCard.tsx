export default function LayerCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="glass p-6 rounded-xl hover:scale-105 transition">
      <h3 className="text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );
}