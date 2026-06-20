import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

const hiddenGemCandidates = [
  {
    id: "jordan-chen",
    name: "Jordan Chen",
    location: "SF, Remote",
    growth: "94%",
    skillMatch: "68%",
    learningVelocity: "92%",
    insight:
      "Candidate has Docker/AWS and can adapt to K8s. Strong backend-to-MLOps transition potential observed through rapid repos growth.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxrRaxsypRgEBxM4ZExFgunGAuHv7KYS2hanpHUNXkvLKgUpwhGiCehxkzZ-MG5dWtIBLElsoe3MNIE9fcKHahXfShzwt3G6FNlzmKMcTqlCxlgSEyhKxRVcu1vNYj305FjMnN9pRTojOTdcLLhxpbht1GoRzq-iloetItJfSnSHQyKUrBMmeEQDrMw5jvlbPMe0dt8vtcIwsg1VDtC3PifBM8u-DlZX9SO0XUAYD4x_uZMSykxjofpVtDXdUPMQKZcVVzU-_WUmb_",
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    location: "Austin, TX",
    growth: "89%",
    skillMatch: "72%",
    learningVelocity: "95%",
    insight:
      "Expert in legacy architecture modernization. Transitioning to Headless CMS and Next.js at 3x industry standard speed.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_L0QbY5R5Yr325m4dUYtvQEPDz2xebWF5TW7w1oqq0Ej27ktztytEEkdYBc4D2xF4eENfcqK6yFDQ2-OUZLIWvJyq8RwzyVdjX35jGLw5hefWajBY9o0xt9ADN8VPBXPf1shDO4NcmzHnCoOhNbyE4q2HgfAgB-F1M4caiSm3u2S98HaN6_jfzYKwteNKt_gkeH9RKN_RTpKEALR6ZITARt2sSMWwyzV7XFGaWZEQP8NyH7Oqfv1ueR6L_On5iJruNH-f3lPC0aeg",
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    location: "London, UK",
    growth: "91%",
    skillMatch: "65%",
    learningVelocity: "88%",
    insight:
      "Cross-functional data lead. Identifying strong transferable skills from FinTech quant analysis to AI-driven logistics forecasting.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgyyTYBHUX7R5DQyna_s0ZorxIZYw5WqVsr_1DhguFDIMe9Ko9L85iIb6Ln8yAbkGiAi2Ht484_GlsW6MeiXMLp6P2-XpSBOXH-pPLml6BE2PTprhbUxtEdmKr8f-H0i2GqdONu4zUOldawilwLZNQO7jD_gIWiKSCYu30DLf5ECbtv9IQFrfaIOQrT2ejLIccnOXB8FhcrsANQx7m4x3dT0rDfT1-snjOHh1tnsVWWbthwYyxQwU7naeiVH7ZQd7PhX7zg62mThWD",
  },
  {
    id: "aria-smith",
    name: "Aria Smith",
    location: "New York, NY",
    growth: "92%",
    skillMatch: "70%",
    learningVelocity: "90%",
    insight:
      "Full-stack engineer with deep expertise in Rust. Perfectly positioned for low-latency backend infrastructure projects.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzR3bzCrMEtO10d9QZH4XOTq3K8-R-pcNmm1Ds7l72UdQjq6v8aGWG4yyhFWuftSqX4Mf4oXMd2vlKr_RTDZ0T5DpVnJyH-hnMbbuLgeCJLfywS0FbWVi-r-L3ey6VMT9lLcupAd_zH0FevAjGII7PFcYVhJCLhS63CUbnPMhJNbd5tfoSYrNW1SxYEUil1ca9rO0BLEEP0z9RszC9XfFaAvTx2zpxK99LixWSDZKRs39Spq0dCIHr61Gs7LmCcgkqRczV3LKP63Vd",
  },
];

export default function HiddenGemsPage() {
  const navigate = useNavigate();
  const [showOnlyHiddenGems, setShowOnlyHiddenGems] = useState(true);

  return (
    <AppLayout
      title="Hidden Gem Discovery"
      searchPlaceholder="Search candidate intelligence..."
    >
      <div className="space-y-lg p-lg pb-28">
        {/* Page Header & Summary */}
        <section className="flex flex-col justify-between gap-md md:flex-row md:items-end">
          <div className="space-y-1">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Hidden Gem Discovery
            </h2>
            <p className="font-body-md text-on-surface-variant">
              AI-surfaced candidates with high growth trajectory and
              non-traditional skill overlap.
            </p>
          </div>

          <div className="flex items-end gap-lg">
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface-variant">
                Hidden Gems Found
              </span>
              <span className="font-headline-md text-headline-md text-primary">
                47
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-md text-on-surface-variant">
                Avg Potential
              </span>
              <span className="font-headline-md text-headline-md text-tertiary">
                88%
              </span>
            </div>

            <label className="ml-4 flex cursor-pointer items-center">
              <span className="mr-3 font-label-md text-on-surface">
                Show only hidden gems
              </span>

              <button
                type="button"
                onClick={() => setShowOnlyHiddenGems((current) => !current)}
                className="relative"
              >
                <div
                  className={[
                    "block h-7 w-12 rounded-full transition-colors",
                    showOnlyHiddenGems
                      ? "bg-primary/20"
                      : "bg-surface-container-highest",
                  ].join(" ")}
                />
                <div
                  className={[
                    "absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-transform",
                    showOnlyHiddenGems
                      ? "translate-x-5 !bg-primary"
                      : "translate-x-0",
                  ].join(" ")}
                />
              </button>
            </label>
          </div>
        </section>

        {/* Bento-style Grid */}
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2 xl:grid-cols-3">
          {hiddenGemCandidates.map((candidate) => (
            <HiddenGemCard
              key={candidate.id}
              {...candidate}
              onViewProfile={() =>
                navigate(`/candidate-profile/${candidate.id}`)
              }
              onCompare={() => navigate("/talent-twin")}
            />
          ))}

          {/* Intelligence Spotlight */}
          <div className="glass-card flex flex-col items-center justify-center space-y-md rounded-xl border-2 border-dashed border-primary/20 bg-surface-container-high p-lg text-center xl:col-span-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-md">
              <span className="material-symbols-outlined text-4xl">
                psychology_alt
              </span>
            </div>

            <div className="max-w-md">
              <h4 className="font-headline-md text-on-surface">
                How Hidden Gems Work
              </h4>
              <p className="font-body-sm text-on-surface-variant">
                Our AI analyzes over 200 data points including GitHub activity,
                technical publication sentiment, and cross-domain skill mapping
                to identify candidates whose potential outpaces their current
                title.
              </p>
            </div>

            <button className="rounded-full bg-primary px-6 py-2 font-label-md text-white transition-all hover:shadow-lg hover:shadow-primary/20">
              Refine Search Parameters
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function HiddenGemCard({
  name,
  location,
  growth,
  skillMatch,
  learningVelocity,
  insight,
  image,
  onViewProfile,
  onCompare,
}: {
  name: string;
  location: string;
  growth: string;
  skillMatch: string;
  learningVelocity: string;
  insight: string;
  image: string;
  onViewProfile: () => void;
  onCompare: () => void;
}) {
  return (
    <div className="glass-card ai-glow flex flex-col gap-md rounded-xl border-l-4 border-tertiary p-md transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-md">
          <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-surface-container-high shadow-sm">
            <img
              className="h-full w-full object-cover"
              alt={name}
              src={image}
            />
          </div>

          <div>
            <h3 className="font-headline-md text-on-surface">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-tertiary-container px-2 py-0.5 text-[10px] font-bold uppercase text-on-tertiary-container">
                High Potential
              </span>
              <span className="font-label-md text-xs text-on-surface-variant">
                {location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="font-label-md text-xs text-on-surface-variant">
            Growth
          </span>
          <span className="font-headline-md text-tertiary">{growth}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-y border-outline-variant/30 py-2">
        <MetricBlock label="Skill Match" value={skillMatch} />
        <MetricBlock label="Learning Velocity" value={learningVelocity} />
      </div>

      {/* AI Explanation */}
      <div className="rounded-lg border border-tertiary/20 bg-tertiary-container/5 p-3">
        <div className="mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-tertiary">
            auto_awesome
          </span>
          <span className="font-label-md text-xs uppercase tracking-tight text-tertiary">
            AI Insight
          </span>
        </div>

        <p className="text-body-sm leading-relaxed text-on-surface-variant">
          {insight}
        </p>
      </div>

      <div className="mt-auto flex gap-2 pt-2">
        <button
          onClick={onViewProfile}
          className="flex-1 rounded-lg bg-primary px-4 py-2 font-label-md text-white transition-opacity hover:opacity-90"
        >
          View Profile
        </button>

        <button className="rounded-lg border border-primary px-3 py-2 text-primary transition-colors hover:bg-primary/5">
          <span className="material-symbols-outlined">add</span>
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
      <span className="font-label-md text-xs text-on-surface-variant">
        {label}
      </span>
      <span className="font-bold text-on-surface">{value}</span>
    </div>
  );
}
