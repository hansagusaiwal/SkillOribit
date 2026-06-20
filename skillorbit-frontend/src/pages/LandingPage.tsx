import { useNavigate } from "react-router-dom";

const problemCards = [
  {
    icon: "filter_list_off",
    title: "Keyword matching",
    text: "Relying on exact word matches excludes highly qualified candidates who use different terminology.",
  },
  {
    icon: "timer_off",
    title: "Time waste",
    text: "Recruiters spend 60% of their time filtering irrelevant resumes instead of talking to top talent.",
  },
  {
    icon: "diamond",
    title: "Hidden gems",
    text: "Non-obvious candidates with perfect skill transferability are buried at the bottom of the pile.",
  },
  {
    icon: "help_outline",
    title: "No explanation",
    text: "Traditional AI ranking gives a score without explaining why a candidate is a good fit.",
  },
];

const features = [
  {
    icon: "psychology",
    title: "Deep Job Understanding",
    text: "AI analyzes your job description to identify not just keywords, but the implicit soft skills and core technical competencies required for success.",
    iconWrap: "bg-primary/5",
    iconClass: "text-primary",
  },
  {
    icon: "dns",
    title: "Candidate DNA",
    text: "We map millions of data points from resumes, social presence, and work history to create a holistic profile of every professional.",
    iconWrap: "bg-tertiary-container/5",
    iconClass: "text-tertiary-container",
  },
  {
    icon: "hub",
    title: "Hybrid Retrieval",
    text: "Combining traditional Boolean search with semantic vector search for better coverage and relevance across your talent pool.",
    iconWrap: "bg-secondary-container/5",
    iconClass: "text-secondary-container",
  },
  {
    icon: "leaderboard",
    title: "Predictive Ranking",
    text: "Advanced ranking algorithms that predict the likelihood of a candidate succeeding in your company culture and team structure.",
    iconWrap: "bg-primary/5",
    iconClass: "text-primary",
  },
  {
    icon: "auto_awesome",
    title: "Hidden Gem Discovery",
    text: "Discover candidates from non-traditional backgrounds who have the exact transferable skills needed for difficult roles.",
    iconWrap: "bg-tertiary-container/5",
    iconClass: "text-tertiary-container",
  },
  {
    icon: "visibility",
    title: "Explainable AI",
    text: "Transparency in every recommendation. Understand exactly which signals led to a candidate's high match score.",
    iconWrap: "bg-secondary-container/5",
    iconClass: "text-secondary-container",
  },
];

const steps = [
  {
    icon: "add_circle",
    title: "Create Job",
    text: "Paste your JD or define the role in seconds.",
  },
  {
    icon: "neurology",
    title: "AI Understands",
    text: "SkillOrbit extracts skills, seniority, context, and ideal candidate DNA.",
  },
  {
    icon: "sort",
    title: "Ranked",
    text: "Get a ranked talent pool by success probability and recruitability.",
  },
  {
    icon: "ios_share",
    title: "Export",
    text: "Shortlist, compare, and export candidates to your workflow.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-body-md text-on-surface">
      {/* Top Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-[100] flex h-header-height items-center justify-between border-b border-outline-variant/30 bg-white/75 px-lg shadow-sm shadow-primary/5 backdrop-blur-md">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <span
            className="material-symbols-outlined text-3xl text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            cloud_done
          </span>
          <span className="font-headline-md text-headline-md font-extrabold tracking-tight text-on-surface">
            SkillOrbit
          </span>
        </button>

        <div className="hidden items-center gap-xl md:flex">
          <a
            className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
            href="#product"
          >
            Product
          </a>
          <a
            className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
            href="#features"
          >
            Features
          </a>
          <a
            className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
            href="#how"
          >
            How It Works
          </a>
          <a
            className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
            href="#demo"
          >
            Demo
          </a>
        </div>

        <div className="flex items-center gap-md">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="px-md py-sm font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="rounded-lg bg-primary px-lg py-sm font-label-md text-label-md text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Launch Demo
          </button>
        </div>
      </nav>

      {/* Premium Hero Section */}
      <section
        id="product"
        className="relative overflow-hidden px-lg pb-28 pt-36"
      >
        {/* Background Orbs */}
        <div className="pointer-events-none absolute left-[-120px] top-20 h-[360px] w-[360px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-120px] top-40 h-[420px] w-[420px] rounded-full bg-tertiary-fixed/40 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[280px] w-[600px] -translate-x-1/2 rounded-full bg-secondary/10 blur-[120px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Hero Copy */}
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl">
              <span
                className="material-symbols-outlined text-sm text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="font-label-md text-xs uppercase tracking-widest text-primary">
                AI-powered intelligent candidate discovery
              </span>
            </div>

            <h1 className="mb-6 max-w-3xl font-display-lg text-[56px] font-extrabold leading-[1.03] tracking-[-0.04em] text-on-surface">
              Find the candidates traditional hiring systems{" "}
              <span className="gradient-text">miss.</span>
            </h1>

            <p className="mb-10 max-w-xl font-body-lg text-[19px] leading-8 text-on-surface-variant">
              SkillOrbit maps every candidate into structured intelligence,
              predicts role success, explains rankings, and surfaces hidden
              gems beyond keyword matching.
            </p>

            <div className="mb-12 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="group flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 font-headline-md text-lg text-on-primary shadow-2xl shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-[0.98]"
              >
                Launch SkillOrbit
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-2xl border border-outline-variant bg-white/70 px-8 py-4 font-headline-md text-lg text-on-surface shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white"
              >
                View Product Demo
              </button>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-4">
              <HeroMetric value="100K+" label="Profiles Indexed" />
              <HeroMetric value="92%" label="Success Score" />
              <HeroMetric value="12min" label="Search Time" />
            </div>
          </div>

          {/* Right Product Visual */}
          <div className="relative z-10" id="demo">
            <FloatingBadge
              className="-left-8 -top-8"
              icon="verified"
              iconClass="text-emerald-500"
              title="AI Confidence"
              text="98.4% ranking reliability"
            />

            <FloatingBadge
              className="-right-6 bottom-16"
              icon="diamond"
              iconClass="text-tertiary"
              title="Hidden Gems"
              text="47 high-potential candidates found"
            />

            <div className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-2xl shadow-primary/10 backdrop-blur-2xl">
              <div className="rounded-[22px] border border-outline-variant/50 bg-surface p-5">
                {/* Mini Dashboard Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      Senior AI Engineer
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      3,482 relevant candidates ranked by SkillOrbit AI
                    </p>
                  </div>

                  <div className="rounded-xl bg-tertiary-fixed px-3 py-2">
                    <span className="material-symbols-outlined text-tertiary">
                      psychology
                    </span>
                  </div>
                </div>

                {/* Talent Twin */}
                <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">
                        hub
                      </span>
                      <span className="text-sm font-extrabold text-on-surface">
                        Talent Twin Match
                      </span>
                    </div>
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                      92%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <MiniSignal label="Skills" value="94%" />
                    <MiniSignal label="Growth" value="91%" />
                    <MiniSignal label="Intent" value="88%" />
                  </div>
                </div>

                {/* Candidate Rows */}
                <div className="space-y-3">
                  <PremiumCandidateRow
                    name="Aarav Mehta"
                    role="Senior ML Engineer"
                    score="92%"
                    tag="Top Match"
                    tone="emerald"
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuAE80bNloxG-Ba_AJIa_UEOjC7oVZhrth6AnK2gOtEl5JZJhfhobGHnnFiXIq1zKDtIj1u3Bf2vbKxEzfr0RhZSMDA5uas8p5x_KEr2DeljK82yIZWaaXLdXIHqCWldoMz66MksUst9Lp-lKmemg1bBr2qRRoQHgkQxq4Vii9P-ZfD8c-O23A-ZVuvBap8AUXTqsra2Ngghd5IeRjllAR9_qUm76VfiXhZWwYhkZDLI0gPfJ49MMpzSISI4sxyUMOmBeJtZC9-Cq6ql"
                  />

                  <PremiumCandidateRow
                    name="Jordan Chen"
                    role="Backend → MLOps"
                    score="87%"
                    tag="Hidden Gem"
                    tone="cyan"
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuCxrRaxsypRgEBxM4ZExFgunGAuHv7KYS2hanpHUNXkvLKgUpwhGiCehxkzZ-MG5dWtIBLElsoe3MNIE9fcKHahXfShzwt3G6FNlzmKMcTqlCxlgSEyhKxRVcu1vNYj305FjMnN9pRTojOTdcLLhxpbht1GoRzq-iloetItJfSnSHQyKUrBMmeEQDrMw5jvlbPMe0dt8vtcIwsg1VDtC3PifBM8u-DlZX9SO0XUAYD4x_uZMSykxjofpVtDXdUPMQKZcVVzU-_WUmb_"
                  />
                </div>

                {/* AI Insight */}
                <div className="mt-5 rounded-2xl border border-tertiary/20 bg-tertiary-container/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-tertiary">
                    <span className="material-symbols-outlined text-lg">
                      auto_awesome
                    </span>
                    <span className="text-xs font-extrabold uppercase tracking-widest">
                      AI Ranking Explanation
                    </span>
                  </div>
                  <p className="text-xs leading-5 text-on-surface-variant">
                    Jordan is surfaced as a hidden gem because Docker, AWS,
                    Terraform, and backend ownership indicate fast Kubernetes
                    adaptability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Logo Strip */}
      <section className="border-y border-outline-variant/30 bg-white/60 px-lg py-8 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">
            Built for high-growth hiring teams
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-extrabold text-on-surface-variant/70">
            <span>AI Engineering</span>
            <span>Data Science</span>
            <span>Product Teams</span>
            <span>Cloud Hiring</span>
            <span>Startup Recruiting</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-surface-container-low px-lg py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-headline-lg text-headline-lg text-on-surface">
              Traditional hiring filters miss the best talent
            </h2>
            <p className="mx-auto max-w-2xl font-body-md text-body-md text-on-surface-variant">
              Manual screening is broken. Keyword matching ignores potential,
              culture fit, and transferable expertise.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {problemCards.map((card) => (
              <ProblemCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-lg py-24" id="features">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-2xl">
              <h2 className="mb-4 font-headline-lg text-headline-lg text-on-surface">
                SkillOrbit turns candidate discovery into predictive
                intelligence
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                It combines semantic retrieval, candidate DNA, ranking
                explanations, and hidden gem detection into one recruiter-first
                workflow.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="rounded-lg bg-secondary-container/10 px-lg py-3 font-label-md text-label-md text-primary transition-all hover:bg-secondary-container/20"
            >
              View Full Feature List
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="overflow-hidden bg-surface-container px-lg py-24"
        id="how"
      >
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Precision hiring in four simple steps
            </h2>
          </div>

          <div className="relative flex flex-col items-start justify-between gap-12 lg:flex-row lg:gap-4">
            <div className="absolute left-0 top-12 -z-10 hidden h-[2px] w-full bg-outline-variant/30 lg:block">
              <div className="orbit-line animate-pulse" />
            </div>

            {steps.map((step) => (
              <StepCard key={step.title} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Score Highlight */}
      <section className="px-lg py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <ScoreTile
                value="94%"
                label="Technical Fit"
                valueClass="text-emerald-600"
                barClass="bg-emerald-500"
                width="94%"
              />
              <ScoreTile
                value="88%"
                label="Recruitability"
                valueClass="text-blue-600"
                barClass="bg-blue-500"
                width="88%"
              />
              <ScoreTile
                value="91%"
                label="Growth Potential"
                valueClass="text-amber-500"
                barClass="bg-amber-500"
                width="91%"
              />

              <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary/5 p-lg shadow-lg">
                <div className="relative z-10">
                  <div className="mb-1 text-4xl font-bold text-primary">
                    92%
                  </div>
                  <div className="font-label-md text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                    Success Score
                  </div>
                </div>

                <span className="material-symbols-outlined absolute -bottom-2 -right-2 rotate-12 text-6xl text-primary/10">
                  verified
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="mb-6 font-headline-lg text-headline-lg text-on-surface">
              Quantifiable insights for data-driven hiring
            </h2>
            <p className="mb-8 font-body-lg text-body-lg text-on-surface-variant">
              Stop guessing. SkillOrbit provides a multi-factor score that
              analyzes everything from technical strength to the likelihood of a
              candidate engaging with your hiring process.
            </p>

            <ul className="space-y-4">
              <CheckItem text="Verified skill assessment through history analysis" />
              <CheckItem text="Market-driven salary expectation modeling" />
              <CheckItem text="Team-fit dynamics based on behavioral patterns" />
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-lg py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-secondary-container to-secondary p-12 text-center shadow-2xl shadow-primary/30 lg:p-20">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-tertiary-fixed/20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mb-8 font-display-lg text-headline-lg text-on-primary md:text-display-lg">
              Ready to find your next best hire?
            </h2>

            <p className="mx-auto mb-12 max-w-xl font-body-lg text-body-lg text-on-primary/80">
              Build a recruiter workflow that explains why candidates fit,
              where risk exists, and which hidden gems deserve attention.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-xl bg-white px-xl py-4 font-headline-md text-lg text-primary shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Login to Dashboard
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-xl border-2 border-white/30 bg-transparent px-xl py-4 font-headline-md text-lg text-on-primary transition-all hover:bg-white/10"
              >
                Explore Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-outline-variant/30 px-lg py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-2xl text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              cloud_done
            </span>
            <span className="font-headline-md text-body-lg font-extrabold text-on-surface">
              SkillOrbit
            </span>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2024 SkillOrbit AI. All rights reserved.
          </p>

          <div className="flex gap-8">
            <a
              className="text-on-surface-variant transition-colors hover:text-primary"
              href="#"
            >
              Privacy
            </a>
            <a
              className="text-on-surface-variant transition-colors hover:text-primary"
              href="#"
            >
              Terms
            </a>
            <a
              className="text-on-surface-variant transition-colors hover:text-primary"
              href="#"
            >
              Security
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Helper Components */

function FloatingBadge({
  className,
  icon,
  iconClass,
  title,
  text,
}: {
  className: string;
  icon: string;
  iconClass: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className={`absolute z-20 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-xl backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className={`material-symbols-outlined ${iconClass}`}>{icon}</span>
        <div>
          <p className="text-xs font-bold text-on-surface">{title}</p>
          <p className="text-[11px] text-on-surface-variant">{text}</p>
        </div>
      </div>
    </div>
  );
}

function HeroMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-outline-variant/40 bg-white/70 p-4 shadow-sm backdrop-blur-xl">
      <div className="font-headline-lg text-2xl font-extrabold text-on-surface">
        {value}
      </div>
      <div className="mt-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
        {label}
      </div>
    </div>
  );
}

function MiniSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-3 text-center shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
        {label}
      </p>
      <p className="mt-1 text-sm font-extrabold text-primary">{value}</p>
    </div>
  );
}

function PremiumCandidateRow({
  name,
  role,
  score,
  tag,
  tone,
  image,
}: {
  name: string;
  role: string;
  score: string;
  tag: string;
  tone: "emerald" | "cyan";
  image: string;
}) {
  const tagClass =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-tertiary-fixed text-on-tertiary-fixed-variant";

  return (
    <div className="flex items-center justify-between rounded-2xl border border-outline-variant/40 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={name}
          className="h-11 w-11 rounded-full object-cover"
        />

        <div>
          <p className="font-bold text-on-surface">{name}</p>
          <p className="text-xs text-on-surface-variant">{role}</p>
        </div>
      </div>

      <div className="text-right">
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-bold ${tagClass}`}
        >
          {tag}
        </span>
        <p className="mt-1 text-lg font-extrabold text-primary">{score}</p>
      </div>
    </div>
  );
}

function ProblemCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-2xl border border-outline-variant/30 bg-white p-lg transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <span className="material-symbols-outlined mb-4 text-3xl text-outline transition-colors group-hover:text-primary">
        {icon}
      </span>

      <h4 className="mb-2 font-headline-md text-body-md font-bold">{title}</h4>

      <p className="font-body-sm text-body-sm text-on-surface-variant">
        {text}
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  iconWrap,
  iconClass,
}: {
  icon: string;
  title: string;
  text: string;
  iconWrap: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-3xl border border-outline-variant/20 bg-surface p-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${iconWrap}`}
      >
        <span className={`material-symbols-outlined text-3xl ${iconClass}`}>
          {icon}
        </span>
      </div>

      <h3 className="mb-3 font-headline-md text-headline-md">{title}</h3>

      <p className="font-body-md text-on-surface-variant">{text}</p>
    </div>
  );
}

function StepCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group flex flex-1 flex-col items-center text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/10 bg-white text-primary shadow-xl transition-transform group-hover:scale-110">
        <span className="material-symbols-outlined text-4xl">{icon}</span>
      </div>

      <h4 className="mb-2 font-headline-md text-headline-md">{title}</h4>

      <p className="max-w-[200px] font-body-sm text-body-sm text-on-surface-variant">
        {text}
      </p>
    </div>
  );
}

function ScoreTile({
  value,
  label,
  valueClass,
  barClass,
  width,
}: {
  value: string;
  label: string;
  valueClass: string;
  barClass: string;
  width: string;
}) {
  return (
    <div className="rounded-2xl border border-outline-variant bg-white p-lg shadow-sm transition-shadow hover:shadow-md">
      <div className={`mb-1 text-3xl font-bold ${valueClass}`}>{value}</div>

      <div className="font-label-md text-on-surface">{label}</div>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-container">
        <div className={`h-full ${barClass}`} style={{ width }} />
      </div>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 font-body-md text-on-surface">
      <span className="material-symbols-outlined text-emerald-500">
        check_circle
      </span>
      {text}
    </li>
  );
}