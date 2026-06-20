import { Sparkles } from "lucide-react";

type AiInsightCardProps = {
  title: string;
  children: string;
};

export default function AiInsightCard({ title, children }: AiInsightCardProps) {
  return (
    <div className="rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50 p-5 shadow-soft ai-glow">
      <div className="mb-3 flex items-center gap-2">
        <div className="rounded-2xl bg-violet-100 p-2 text-brand-600">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="font-bold text-slate-950">{title}</h3>
      </div>
      <p className="text-sm leading-6 text-slate-600">{children}</p>
    </div>
  );
}