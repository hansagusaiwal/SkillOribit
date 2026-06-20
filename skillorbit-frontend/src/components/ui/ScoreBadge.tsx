type ScoreBadgeProps = {
  score: number;
  label?: string;
};

export default function ScoreBadge({ score, label = "Success" }: ScoreBadgeProps) {
  const color =
    score >= 90
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : score >= 80
        ? "text-cyan-700 bg-cyan-50 border-cyan-200"
        : "text-orange-700 bg-orange-50 border-orange-200";

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-bold ${color}`}>
      <span>{score}%</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}