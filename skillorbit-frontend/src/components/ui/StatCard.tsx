import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  tone?: "purple" | "cyan" | "emerald" | "orange";
};

const tones = {
  purple: "from-brand-500 to-brand-600 text-white",
  cyan: "from-cyan-400 to-cyan-600 text-white",
  emerald: "from-emerald-400 to-emerald-600 text-white",
  orange: "from-orange-400 to-orange-500 text-white",
};

export default function StatCard({ title, value, change, icon: Icon, tone = "purple" }: StatCardProps) {
  return (
    <div className="glass-card rounded-3xl p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">{value}</h3>
          {change && <p className="mt-2 text-sm font-medium text-emerald-600">{change}</p>}
        </div>
        <div className={`rounded-2xl bg-gradient-to-br p-3 ${tones[tone]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}