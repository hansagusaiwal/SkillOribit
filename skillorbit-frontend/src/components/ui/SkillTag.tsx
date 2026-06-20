type SkillTagProps = {
  children: string;
  tone?: "purple" | "green" | "cyan" | "slate";
};

const tones = {
  purple: "border-violet-200 bg-violet-50 text-violet-700",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-700",
  slate: "border-slate-200 bg-slate-50 text-slate-600",
};

export default function SkillTag({ children, tone = "purple" }: SkillTagProps) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}