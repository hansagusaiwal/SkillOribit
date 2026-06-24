import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { detectHiddenGems } from "../api";

export default function HiddenGemsPage() {
  const navigate = useNavigate();
  const [gems, setGems] = useState<Awaited<ReturnType<typeof detectHiddenGems>>["gems"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detectHiddenGems(20)
      .then((data) => setGems(data.gems))
      .catch(() => setGems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout
      title="Hidden Gem Discovery"
      searchPlaceholder="Search candidate intelligence..."
    >
      <div className="space-y-lg p-lg pb-28">
        <section className="flex flex-col justify-between gap-md md:flex-row md:items-end">
          <div className="space-y-1">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Hidden Gem Discovery
            </h2>
            <p className="font-body-md text-on-surface-variant">
              AI-surfaced candidates with high growth trajectory and non-traditional skill overlap.
            </p>
          </div>

          <div className="flex items-end gap-lg">
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface-variant">Hidden Gems Found</span>
              <span className="font-headline-md text-headline-md text-primary">
                {loading ? "..." : gems.length}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface-variant">Avg Potential</span>
              <span className="font-headline-md text-headline-md text-tertiary">
                {loading
                  ? "..."
                  : gems.length > 0
                    ? `${Math.round(gems.reduce((s, g) => s + g.gem_score, 0) / gems.length)}%`
                    : "N/A"}
              </span>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
          </div>
        ) : gems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-white p-xl text-center">
            <p className="font-body-md text-on-surface-variant">
              No hidden gems detected. Make sure the backend is running.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-lg md:grid-cols-2 xl:grid-cols-3">
            {gems.map((gem) => (
              <HiddenGemCard
                key={gem.id}
                gem={gem}
                onViewProfile={() => navigate(`/candidate-profile/${gem.id}`)}
                onCompare={() => navigate("/talent-twin")}
              />
            ))}

            <div className="glass-card flex flex-col items-center justify-center space-y-md rounded-xl border-2 border-dashed border-primary/20 bg-surface-container-high p-lg text-center xl:col-span-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-md">
                <span className="material-symbols-outlined text-4xl">psychology_alt</span>
              </div>
              <div className="max-w-md">
                <h4 className="font-headline-md text-on-surface">How Hidden Gems Work</h4>
                <p className="font-body-sm text-on-surface-variant">
                  Our AI uses three complementary detection strategies — rule-based score gap analysis,
                  Isolation Forest anomaly detection, and DBSCAN clustering — to identify candidates
                  whose potential outpaces their current title.
                </p>
              </div>
              <button className="rounded-full bg-primary px-6 py-2 font-label-md text-white transition-all hover:shadow-lg hover:shadow-primary/20">
                Refine Search Parameters
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function HiddenGemCard({ gem, onViewProfile, onCompare }: {
  gem: { gem_rank: number; id: string; name: string; role: string; company: string; successScore: number; skillMatch: number; learningVelocity: number; gem_score: number; gem_reason: string };
  onViewProfile: () => void;
  onCompare: () => void;
}) {
  return (
    <div className="glass-card ai-glow flex flex-col gap-md rounded-xl border-l-4 border-tertiary p-md transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-md">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-tertiary to-primary text-lg font-bold text-white shadow-sm">
            #{gem.gem_rank}
          </div>
          <div>
            <h3 className="font-headline-md text-on-surface">{gem.name}</h3>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-tertiary-container px-2 py-0.5 text-[10px] font-bold uppercase text-on-tertiary-container">
                Gem Score: {gem.gem_score}
              </span>
              <span className="font-label-md text-xs text-on-surface-variant">{gem.role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-y border-outline-variant/30 py-2">
        <MetricBlock label="Success Score" value={`${Math.round(gem.successScore)}%`} />
        <MetricBlock label="Skill Match" value={`${Math.round(gem.skillMatch)}%`} />
      </div>

      <div className="rounded-lg border border-tertiary/20 bg-tertiary-container/5 p-3">
        <div className="mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-tertiary">auto_awesome</span>
          <span className="font-label-md text-xs uppercase tracking-tight text-tertiary">AI Insight</span>
        </div>
        <p className="text-body-sm leading-relaxed text-on-surface-variant">{gem.gem_reason}</p>
      </div>

      <div className="mt-auto flex gap-2 pt-2">
        <button
          onClick={onViewProfile}
          className="flex-1 rounded-lg bg-primary px-4 py-2 font-label-md text-white transition-opacity hover:opacity-90"
        >
          View Profile
        </button>
        <button
          onClick={onCompare}
          className="rounded-lg border border-outline px-3 py-2 text-on-surface-variant transition-colors hover:bg-surface-container"
        >
          <span className="material-symbols-outlined">compare_arrows</span>
        </button>
      </div>
    </div>
  );
}

function MetricBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-label-md text-xs text-on-surface-variant">{label}</span>
      <span className="font-bold text-on-surface">{value}</span>
    </div>
  );
}
