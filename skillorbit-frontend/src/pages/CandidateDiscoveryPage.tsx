import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

const candidates = [
  {
    rank: 1,
    name: "Aarav Mehta",
    role: "Lead AI Engineer @ TechFlow",
    tech: 94,
    recruit: 88,
    growth: 91,
    success: 92,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJbCRF2Y0AwKrBTbCfgpgCcvBd1lVy0QV0Y9Cp6PULZJoMSzgRIYJKJWXgviPeU3W3bb46vu_KUFrEMcS40EdH760toqA967Ou7sWmTBQ5G810qP3BbHmi1XrLX9W-89J5oMxwNQnD9BtRGk2nuFvbWcUkHX__XzOVue2johhGbF0PtZ8q4nifIy6dZHp1OvVtSVxjV6Kcr8z2sWGPFwi7TzkzPdmFAJ9KoWATYNkg40AKNCkBQun5Muo-_k1d13VBBTkGbV21tEjq",
  },
  {
    rank: 2,
    name: "Neha Iyer",
    role: "Senior ML Research Scientist",
    tech: 91,
    recruit: 85,
    growth: 89,
    success: 90,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDO3HwDCneMc2UFObQxN7nBsUvGFP64K-u-hZEP60nXs0jzuLFLT-GhUIUegsSGZKZbfRmRb-fIE39xXjAfDNoreQXFJWLi_e0dlAsykM1GJn3aY-tHF6ekoa-kgLNifYoqpuJ6SV3z0APG0q9lMyYCBl_fts-Y7we0Z2A3VrzHK2za27ohdHDjeIj17cBAj-190TxW0LKp1N73-mWMqIDOL-oyM0Ptsgif-9NjDWGfw70esOcfGvEvVdtFGYJ63UlacyFep_08Zr58",
  },
];

export default function CandidateDiscoveryPage() {
  const navigate = useNavigate();

  const [skillMatch, setSkillMatch] = useState(80);
  const [experienceMax, setExperienceMax] = useState(12);
  const [successScore, setSuccessScore] = useState(85);

  const [hiddenGemsOnly, setHiddenGemsOnly] = useState(true);
  const [remoteCandidates, setRemoteCandidates] = useState(false);
  const [highRecruitability, setHighRecruitability] = useState(true);

  function clearFilters() {
    setSkillMatch(80);
    setExperienceMax(12);
    setSuccessScore(85);
    setHiddenGemsOnly(false);
    setRemoteCandidates(false);
    setHighRecruitability(false);
  }

  return (
    <AppLayout
      title="Candidate Discovery"
      searchPlaceholder="Search by name, skill, or role..."
    >
      <div className="min-h-[calc(100vh-64px)] bg-background p-lg pb-28">
        <div className="space-y-lg">
          {/* Job Context Bar */}
          <section className="flex w-full items-center justify-between rounded-xl border border-outline-variant bg-white p-md shadow-sm">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-outline">
                  Active Job
                </span>
                <span className="font-headline-md text-headline-md text-on-surface">
                  Senior AI Engineer
                </span>
              </div>

              <div className="h-10 w-px bg-outline-variant" />

              <div className="flex gap-8">
                <ContextMetric label="Total Scanned" value="100,000+" />
                <ContextMetric label="Relevant" value="3,482" />

                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-outline">
                    Ranked Pool
                  </span>
                  <span className="w-fit rounded-full bg-primary-container px-2 py-0.5 text-xs font-bold text-on-primary-container">
                    Top 100
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="rounded-lg border border-primary px-4 py-2 font-label-md text-label-md text-primary transition-all hover:bg-primary/5">
                Edit Parameters
              </button>

              <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-label-md text-label-md text-white shadow-md transition-all hover:opacity-90">
                <span className="material-symbols-outlined text-[18px]">
                  refresh
                </span>
                Re-Rank Pool
              </button>
            </div>
          </section>

          {/* Main Layout */}
          <div className="grid grid-cols-[280px_minmax(0,1fr)] items-start gap-lg">
            {/* Left Filters */}
            <aside className="space-y-md">
              <div className="space-y-6 rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
                <h3 className="flex items-center gap-2 font-label-md text-sm uppercase tracking-widest text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">
                    filter_alt
                  </span>
                  Discovery Filters
                </h3>

                <div className="space-y-4">
                  <ControlledRange
                    label="Skill Match"
                    displayValue={`${skillMatch}%+`}
                    min={50}
                    max={100}
                    currentValue={skillMatch}
                    onChange={setSkillMatch}
                  />

                  <ControlledRange
                    label="Experience Years"
                    displayValue={`5 - ${experienceMax}`}
                    min={5}
                    max={15}
                    currentValue={experienceMax}
                    onChange={setExperienceMax}
                  />
                </div>

                <div className="space-y-3 border-t border-outline-variant pt-4">
                  <CheckboxRow
                    label="Hidden Gems Only"
                    checked={hiddenGemsOnly}
                    onChange={setHiddenGemsOnly}
                    icon="auto_awesome"
                  />

                  <CheckboxRow
                    label="Remote Candidates"
                    checked={remoteCandidates}
                    onChange={setRemoteCandidates}
                  />

                  <CheckboxRow
                    label="Recruitability (High)"
                    checked={highRecruitability}
                    onChange={setHighRecruitability}
                  />
                </div>

                <div className="space-y-4 border-t border-outline-variant pt-4">
                  <ControlledRange
                    label="Min Success Score"
                    displayValue={`${successScore}`}
                    min={50}
                    max={100}
                    currentValue={successScore}
                    onChange={setSuccessScore}
                  />
                </div>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full rounded-lg bg-surface-container-high py-2 font-bold text-primary transition-colors hover:bg-primary-fixed"
                >
                  Clear All Filters
                </button>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-tertiary-container p-lg text-on-tertiary shadow-lg shadow-tertiary/20">
                <div className="relative z-10 space-y-2">
                  <span className="material-symbols-outlined">
                    auto_awesome
                  </span>
                  <h4 className="font-headline-md text-lg font-bold">
                    Predictive Hiring
                  </h4>
                  <p className="text-xs leading-relaxed opacity-80">
                    AI analysis indicates a 42% faster time-to-hire for this
                    pool vs traditional search.
                  </p>
                </div>
              </div>

              {/* Discovery Impact */}
              <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
                <h4 className="mb-md font-label-md text-xs uppercase tracking-widest text-outline">
                  Discovery Impact
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <MiniImpactStat label="Pool Reduced" value="96.5%" />
                  <MiniImpactStat label="Hidden Gems" value="47" />
                  <MiniImpactStat label="Avg Fit" value="89%" />
                  <MiniImpactStat label="Time Saved" value="42%" />
                </div>
              </div>
            </aside>

            {/* Main Candidate Area */}
            <section className="min-w-0 space-y-md">
              {/* Candidate Table */}
              <div className="overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm">
                <table className="w-full table-fixed border-collapse">
                  <thead className="border-b border-outline-variant bg-surface-container-low">
                    <tr>
                      <th className="w-[72px] px-4 py-4 text-left font-label-md text-xs uppercase tracking-wider text-outline">
                        Rank
                      </th>
                      <th className="px-4 py-4 text-left font-label-md text-xs uppercase tracking-wider text-outline">
                        Candidate
                      </th>
                      <th className="w-[280px] px-4 py-4 text-center font-label-md text-xs uppercase tracking-wider text-outline">
                        AI Metrics
                      </th>
                      <th className="w-[104px] px-4 py-4 text-right font-label-md text-xs uppercase tracking-wider text-outline">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-outline-variant">
                    {candidates.map((candidate) => (
                      <CandidateRow
                        key={candidate.rank}
                        candidate={candidate}
                      />
                    ))}

                    <SkeletonRow />
                  </tbody>
                </table>

                <div className="flex items-center justify-between border-t border-outline-variant bg-surface-container-low p-md">
                  <span className="text-xs font-medium text-on-surface-variant">
                    Displaying 10 of 3,482 relevant matches
                  </span>

                  <div className="flex gap-1">
                    <PagerIcon icon="chevron_left" />
                    <button className="rounded border border-outline-variant bg-white px-2 py-1 text-xs font-bold shadow-sm">
                      1
                    </button>
                    <button className="rounded px-2 py-1 text-xs font-medium hover:bg-white">
                      2
                    </button>
                    <button className="rounded px-2 py-1 text-xs font-medium hover:bg-white">
                      3
                    </button>
                    <PagerIcon icon="chevron_right" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center gap-4 py-3">
                <button
                  type="button"
                  onClick={() => navigate("/talent-twin")}
                  className="flex items-center gap-2 rounded-full border border-primary bg-white px-6 py-3 font-bold text-primary shadow-sm transition-all hover:bg-primary/5 active:scale-95"
                >
                  <span className="material-symbols-outlined">
                    compare_arrows
                  </span>
                  Compare Selection
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/shortlist-export")}
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95"
                >
                  <span className="material-symbols-outlined">
                    playlist_add
                  </span>
                  Bulk Shortlist
                </button>
              </div>

              {/* Ranking Logic Full Width */}
              <div className="ai-glass ai-glow relative overflow-hidden rounded-xl p-lg">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-tertiary/5 blur-3xl" />

                <div className="relative z-10 mb-md flex items-start justify-between gap-6">
                  <div>
                    <h3 className="flex items-center gap-2 font-headline-md text-lg text-tertiary">
                      <span className="material-symbols-outlined">
                        psychology
                      </span>
                      Ranking Logic
                    </h3>

                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
                      Our AI analyzed 100k+ profiles across 14 dimensions to
                      rank this pool.
                    </p>
                  </div>

                  <button className="flex shrink-0 items-center gap-2 rounded-lg border border-tertiary/20 bg-white px-4 py-2 text-xs font-bold text-tertiary transition hover:bg-tertiary/5">
                    View Full Intelligence Report
                    <span className="material-symbols-outlined text-[14px]">
                      open_in_new
                    </span>
                  </button>
                </div>

                <div className="relative z-10 grid grid-cols-1 gap-md md:grid-cols-3">
                  <RankingLogicCard
                    title="Skill Density"
                    text="Heavy weight is given to PyTorch, LLM fine-tuning, vector search, and distributed systems experience."
                  />

                  <RankingLogicCard
                    title="Career Trajectory"
                    text="Candidates showing strong ownership growth and role progression over the last 3 years are prioritized."
                  />

                  <RankingLogicCard
                    title="Recruitability Index"
                    text="The model estimates job-seeking intent using tenure, activity, engagement, and responsiveness signals."
                  />
                </div>
              </div>

              {/* Market Context Full Width */}
              <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
                <div className="mb-md flex items-center justify-between">
                  <h4 className="font-label-md text-xs uppercase tracking-widest text-outline">
                    Market Context
                  </h4>

                  <span className="rounded-full bg-error-container px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-error-container">
                    Critical Demand
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
                  <div>
                    <span className="text-xs text-on-surface-variant">
                      Avg. Salary
                    </span>
                    <p className="mt-1 text-lg font-bold text-primary">
                      $185k - $240k
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-on-surface-variant">
                      Demand Level
                    </span>
                    <p className="mt-1 text-lg font-bold text-error">
                      Critical
                    </p>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-xs text-on-surface-variant">
                      <span>Market Pressure</span>
                      <span className="font-bold text-primary">80%</span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                      <div className="h-full w-4/5 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function ContextMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-outline">{label}</span>
      <span className="font-bold text-primary">{value}</span>
    </div>
  );
}

function ControlledRange({
  label,
  displayValue,
  min,
  max,
  currentValue,
  onChange,
}: {
  label: string;
  displayValue: string;
  min: number;
  max: number;
  currentValue: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 flex justify-between text-xs font-semibold text-on-surface-variant">
        {label}
        <span className="text-primary">{displayValue}</span>
      </label>

      <input
        value={currentValue}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-surface-container accent-primary"
        min={min}
        max={max}
        type="range"
      />
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
  icon,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  icon?: string;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3">
      <input
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/20"
        type="checkbox"
      />
      <span className="font-body-sm text-body-sm text-on-surface-variant transition-colors group-hover:text-primary">
        {label}
      </span>
      {icon && (
        <span className="material-symbols-outlined text-[16px] text-tertiary">
          {icon}
        </span>
      )}
    </label>
  );
}

function CandidateRow({
  candidate,
}: {
  candidate: {
    rank: number;
    name: string;
    role: string;
    image: string;
    tech: number;
    recruit: number;
    growth: number;
    success: number;
  };
}) {
  return (
    <tr className="group transition-colors hover:bg-surface-container-lowest">
      <td className="px-4 py-4">
        <div
          className={[
            "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
            candidate.rank === 1
              ? "bg-primary-container text-on-primary-container"
              : "bg-surface-container-high text-on-surface-variant",
          ].join(" ")}
        >
          #{candidate.rank}
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-10 w-10 flex-shrink-0 rounded-full border-2 border-primary/20 p-0.5">
            <img
              className="h-full w-full rounded-full object-cover"
              alt={candidate.name}
              src={candidate.image}
            />
          </div>

          <div className="min-w-0">
            <span className="block truncate text-sm font-bold text-on-surface">
              {candidate.name}
            </span>
            <span className="block truncate text-xs text-on-surface-variant">
              {candidate.role}
            </span>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="grid grid-cols-4 gap-2 text-center">
          <Metric label="Tech" value={candidate.tech} />
          <Metric label="Recruit" value={candidate.recruit} />
          <Metric label="Growth" value={candidate.growth} />

          <div className="flex flex-col items-center justify-center">
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-black text-emerald-700">
              {candidate.success}%
            </span>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 text-right">
        <div className="flex justify-end gap-1 opacity-100">
          <Link
            to="/candidate-profile"
            className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10"
            title="Quick View"
          >
            <span className="material-symbols-outlined">visibility</span>
          </Link>

          <button
            className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10"
            title="Add to Shortlist"
          >
            <span className="material-symbols-outlined">playlist_add</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex min-w-[48px] flex-col items-center leading-tight">
      <span className="text-[9px] font-bold uppercase text-outline">
        {label}
      </span>
      <span className="text-xs font-bold text-emerald-600">{value}%</span>
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="group transition-colors hover:bg-surface-container-lowest">
      <td className="px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-sm font-bold text-on-surface-variant/40">
          #3
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
          <div className="flex flex-col gap-1">
            <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
            <div className="h-2 w-32 animate-pulse rounded bg-slate-50" />
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="grid grid-cols-4 gap-2">
          <div className="h-2 animate-pulse rounded bg-slate-100" />
          <div className="h-2 animate-pulse rounded bg-slate-100" />
          <div className="h-2 animate-pulse rounded bg-slate-100" />
          <div className="h-4 animate-pulse rounded bg-slate-100" />
        </div>
      </td>

      <td className="px-4 py-4" />
    </tr>
  );
}

function PagerIcon({ icon }: { icon: string }) {
  return (
    <button className="rounded p-1 transition-colors hover:bg-white">
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
    </button>
  );
}

function RankingLogicCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="min-h-[120px] rounded-xl border border-outline-variant/50 bg-white/70 p-md">
      <span className="font-label-md text-[11px] font-black uppercase tracking-widest text-tertiary">
        {title}
      </span>

      <p className="mt-2 text-xs leading-5 text-on-surface-variant">{text}</p>
    </div>
  );
}

function MiniImpactStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-container-low p-3">
      <p className="text-lg font-bold text-on-surface">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
        {label}
      </p>
    </div>
  );
}