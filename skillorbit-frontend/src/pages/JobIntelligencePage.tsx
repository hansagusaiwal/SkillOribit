import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

const mustHaveSkills = ["Python", "Machine Learning", "Embeddings", "Vector Search"];
const goodToHaveSkills = ["FastAPI", "Docker", "MLOps"];
const negativeSignals = ["Research-only profile", "No production experience"];
const adjacentSkills = ["Backend Engineering", "Cloud Infra", "K8s", "gRPC"];

export default function JobIntelligencePage() {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Job Intelligence"
      actionLabel="Create New Job"
      searchPlaceholder="Search candidates, jobs, or intelligence reports..."
      onAction={() => navigate("/create-job")}
    >
      <div className="pb-2xl">
        {/* Header Section */}
        <div className="mb-lg flex items-center justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Job Intelligence
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              AI-generated extraction and requirements synthesis for your active search.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-outline px-md py-2 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container">
              <span className="material-symbols-outlined">edit</span>
              Edit Blueprint
            </button>

            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-md py-2 font-label-md text-label-md text-white shadow-lg shadow-primary/20 transition-opacity hover:opacity-90">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                share
              </span>
              Share Report
            </button>
          </div>
        </div>

        {/* Summary Hero Card */}
        <div className="glass-card ai-glow relative mb-xl flex flex-col items-center gap-lg overflow-hidden rounded-2xl p-xl md:flex-row">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-tertiary/5 blur-3xl" />

          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container shadow-inner">
            <span
              className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              precision_manufacturing
            </span>
          </div>

          <div className="flex-grow">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded bg-tertiary-fixed px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-tertiary-fixed-variant">
                Active Search
              </span>
              <span className="text-sm text-on-surface-variant">
                • Posted 2 days ago
              </span>
            </div>

            <h3 className="mb-1 font-headline-md text-headline-md text-on-surface">
              Senior AI Engineer — Production AI / Retrieval Systems
            </h3>

            <p className="max-w-2xl font-body-md text-body-md text-on-surface-variant">
              Focusing on high-scale RAG pipelines, vector database optimization,
              and orchestrating LLM agents within a microservices architecture.
            </p>
          </div>

          <div className="flex min-w-[180px] flex-col items-center justify-center rounded-xl border border-outline-variant bg-white p-md shadow-sm">
            <div className="relative mb-2 h-20 w-20">
              <svg className="h-full w-full -rotate-90">
                <circle
                  className="text-surface-container"
                  cx="40"
                  cy="40"
                  fill="transparent"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <circle
                  className="text-emerald-500"
                  cx="40"
                  cy="40"
                  fill="transparent"
                  r="36"
                  stroke="currentColor"
                  strokeDasharray="226.2"
                  strokeDashoffset="4.5"
                  strokeWidth="4"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">98%</span>
              </div>
            </div>

            <p className="font-label-md text-label-md text-on-surface">
              Match Confidence
            </p>
            <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">
              AI Analysis Complete
            </p>
          </div>
        </div>

        {/* Bento Grid Sections */}
        <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
          {/* Must-Have Skills */}
          <SkillCard
            icon="star"
            iconTone="text-primary"
            title="Must-have Skills"
            items={mustHaveSkills}
            itemClass="bg-primary/10 text-primary"
            filledIcon
          />

          {/* Good-to-Have Skills */}
          <SkillCard
            icon="add_task"
            iconTone="text-tertiary"
            title="Good-to-have Skills"
            items={goodToHaveSkills}
            itemClass="bg-tertiary-fixed text-on-tertiary-fixed-variant"
          />

          {/* Negative Signals */}
          <SkillCard
            icon="warning"
            iconTone="text-error"
            title="Negative Signals"
            items={negativeSignals}
            itemClass="bg-error-container text-on-error-container"
          />

          {/* Professional Context + Adjacent Skills */}
          <div className="flex flex-col items-center gap-lg rounded-2xl border border-outline-variant bg-white p-lg shadow-sm md:col-span-2 md:flex-row">
            <div className="w-full flex-1">
              <div className="mb-md flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined">history_edu</span>
                <h4 className="font-label-md text-label-md uppercase tracking-widest text-on-surface">
                  Professional Context
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-surface-container p-3">
                  <p className="mb-1 text-xs font-bold uppercase text-on-surface-variant">
                    Required Experience
                  </p>
                  <p className="text-xl font-bold text-on-surface">5+ years</p>
                </div>

                <div className="rounded-xl bg-surface-container p-3">
                  <p className="mb-1 text-xs font-bold uppercase text-on-surface-variant">
                    Seniority Level
                  </p>
                  <p className="text-xl font-bold text-on-surface">Senior/Staff</p>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-outline-variant md:h-20 md:w-px" />

            <div className="w-full flex-1">
              <div className="mb-md flex items-center gap-2 text-tertiary">
                <span className="material-symbols-outlined">hub</span>
                <h4 className="font-label-md text-label-md uppercase tracking-widest text-on-surface">
                  Adjacent Skills
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {adjacentSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-surface-container-high px-3 py-1 font-label-md text-sm text-on-surface"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Market Intelligence Insight */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-inverse-surface to-surface-container-highest p-lg text-white shadow-xl">
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed">
                  insights
                </span>
                <span className="font-label-md text-label-md uppercase tracking-widest text-tertiary-fixed">
                  AI Market Insight
                </span>
              </div>

              <p className="mb-4 font-body-md text-body-md leading-relaxed">
                &quot;The current talent density for this stack in San Francisco is{" "}
                <span className="font-bold text-tertiary-fixed">Medium-Low</span>.
                Consider expanding search to Seattle/Remote for better pricing leverage.&quot;
              </p>

              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Confidence: High</span>
                <span>Updated: Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Actions Bar */}
        <div className="glass-card mt-2xl flex flex-col items-center justify-between gap-md rounded-2xl border-t-4 border-primary p-lg md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <span className="material-symbols-outlined text-emerald-600">
                check_circle
              </span>
            </div>

            <div>
              <h5 className="font-label-md text-label-md text-on-surface">
                Intelligence Verified
              </h5>
              <p className="text-sm text-on-surface-variant">
                The AI has analyzed 12,400+ similar job descriptions for these clusters.
              </p>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 md:w-auto">
            <button
              onClick={() => navigate("/candidate-discovery")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-xl py-3 font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 md:flex-none"
            >
              Find Best Candidates
              <span className="material-symbols-outlined">trending_flat</span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function SkillCard({
  icon,
  iconTone,
  title,
  items,
  itemClass,
  filledIcon = false,
}: {
  icon: string;
  iconTone: string;
  title: string;
  items: string[];
  itemClass: string;
  filledIcon?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-outline-variant bg-white p-lg shadow-sm transition-shadow hover:shadow-md">
      <div className={`mb-md flex items-center gap-2 ${iconTone}`}>
        <span
          className="material-symbols-outlined"
          style={
            filledIcon
              ? { fontVariationSettings: "'FILL' 1" }
              : undefined
          }
        >
          {icon}
        </span>
        <h4 className="font-label-md text-label-md uppercase tracking-widest text-on-surface">
          {title}
        </h4>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-full px-3 py-1 font-label-md text-sm ${itemClass}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}