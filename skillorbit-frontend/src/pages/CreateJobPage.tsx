import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import AppLayout from "../components/layout/AppLayout";

const extractedSkills = ["React", "Node.js", "TypeScript", "AWS", "Redis"];

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [experienceYears, setExperienceYears] = useState(6);

  return (
    <AppLayout
      title="Create Job"
      actionLabel="Create New Job"
      searchPlaceholder="Search talent, jobs, or insights..."
      onAction={() => navigate("/create-job")}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-lg md:flex-row">
          {/* Left: Form Area */}
          <section className="flex-1 space-y-lg">
            <div className="mb-md flex items-end justify-between">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Create Job
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Define the role and let AI optimize your reach.
                </p>
              </div>

              <div className="flex gap-sm">
                <button className="rounded-lg border border-outline px-4 py-2 font-label-md text-sm text-on-surface transition-colors hover:bg-surface-container">
                  Save Draft
                </button>

                <button className="rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-2 font-label-md text-sm text-white shadow-md transition-opacity hover:opacity-90">
                  Post Job
                </button>
              </div>
            </div>

            {/* Main Form Card */}
            <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
              <form className="space-y-xl">
                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
                  <div className="space-y-xs">
                    <label className="block font-label-md text-sm text-on-surface-variant">
                      Job Title
                    </label>

                    <input
                      className="w-full rounded-lg border border-outline-variant px-4 py-2 text-on-surface focus:border-primary focus:ring-primary"
                      placeholder="e.g. Senior Full Stack Engineer"
                      type="text"
                    />
                  </div>

                  <div className="space-y-xs">
                    <label className="block font-label-md text-sm text-on-surface-variant">
                      Role Category
                    </label>

                    <select className="w-full rounded-lg border border-outline-variant px-4 py-2 text-on-surface focus:border-primary focus:ring-primary">
                      <option>Engineering</option>
                      <option>Product Management</option>
                      <option>Design</option>
                      <option>Data Science</option>
                      <option>Sales & Marketing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
                  <div className="space-y-xs">
                    <label className="block font-label-md text-sm text-on-surface-variant">
                      Location
                    </label>

                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant">
                        location_on
                      </span>

                      <input
                        className="w-full rounded-lg border border-outline-variant py-2 pl-10 pr-4 text-on-surface focus:border-primary focus:ring-primary"
                        placeholder="New York, NY / Remote"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="space-y-xs">
                    <div className="flex items-center justify-between">
                      <label className="block font-label-md text-sm text-on-surface-variant">
                        Experience Range
                      </label>

                      <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold text-on-primary-fixed-variant">
                        {experienceYears}+ years
                      </span>
                    </div>

                    <div className="flex items-center gap-4 py-2">
                      <span className="font-mono text-xs text-on-surface-variant">
                        0yr
                      </span>

                      <input
                        value={experienceYears}
                        onChange={(event) =>
                          setExperienceYears(Number(event.target.value))
                        }
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-high accent-primary"
                        max="15"
                        min="0"
                        step="1"
                        type="range"
                      />

                      <span className="font-mono text-xs text-on-surface-variant">
                        15yr+
                      </span>
                    </div>

                    <div className="flex justify-center">
                      <span className="font-label-md text-xs text-primary">
                        Preferred experience: {experienceYears}+ years
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description Area */}
                <div className="relative space-y-xs">
                  <div className="flex items-center justify-between">
                    <label className="block font-label-md text-sm text-on-surface-variant">
                      Job Description
                    </label>

                    <button
                      className="flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        upload
                      </span>
                      Upload JD (PDF/DOCX)
                    </button>
                  </div>

                  <div className="group relative">
                    <textarea
                      className="custom-scrollbar w-full resize-none rounded-xl border border-outline-variant px-4 py-4 text-on-surface focus:border-primary focus:ring-primary"
                      id="jd_textarea"
                      placeholder="Paste or type the job description here..."
                      rows={12}
                    />

                    <div className="absolute bottom-4 right-4">
                      <button
                        className="ai-glow flex items-center gap-2 rounded-full bg-tertiary px-4 py-2 font-label-md text-sm text-on-tertiary transition-transform hover:scale-105"
                        type="button"
                        onClick={() => navigate("/job-intelligence")}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          auto_awesome
                        </span>
                        Analyze Job Description
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Extracted Skills Preview */}
            <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
              <div className="mb-md flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">
                  psychology
                </span>
                <h3 className="text-sm font-bold text-on-surface">
                  Extracted Skills Preview
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {extractedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold text-on-primary-fixed-variant"
                  >
                    {skill}
                    <span className="material-symbols-outlined text-[14px]">
                      close
                    </span>
                  </span>
                ))}

                <button
                  type="button"
                  className="rounded-full border border-dashed border-outline-variant px-3 py-1 text-xs font-semibold text-on-surface-variant transition-colors hover:bg-surface-container"
                >
                  + Add Skill
                </button>
              </div>
            </div>
          </section>

          {/* Right: AI Assistance Panel */}
          <aside className="w-full space-y-lg md:w-[320px]">
            {/* AI Recruiter Tips */}
            <div className="ai-glow space-y-md rounded-xl bg-white p-lg">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-tertiary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                <h3 className="text-sm font-bold text-on-surface">
                  AI Recruiter Tips
                </h3>
              </div>

              <div className="space-y-md">
                <TipCard
                  icon="check_circle"
                  text={
                    <>
                      <strong>Add must-have skills:</strong> Your description is
                      missing explicit mention of &quot;PostgreSQL&quot;. Adding
                      this will filter better candidates.
                    </>
                  }
                />

                <TipCard
                  icon="tips_and_updates"
                  text={
                    <>
                      <strong>Mention seniority clearly:</strong> Specify if
                      &quot;Senior&quot; refers to 5+ or 8+ years to align with
                      talent market expectations.
                    </>
                  }
                />

                <TipCard
                  icon="info"
                  text={
                    <>
                      <strong>Include production requirements:</strong>{" "}
                      Candidates often look for &quot;On-call&quot; or
                      &quot;SLA&quot; expectations in high-level engineering
                      roles.
                    </>
                  }
                />
              </div>
            </div>

            {/* Talent Market Summary */}
            <div className="relative overflow-hidden rounded-xl border border-outline-variant bg-white p-lg">
              <h3 className="relative z-10 text-sm font-bold text-on-surface">
                Talent Market Summary
              </h3>

              <div className="relative z-10 mt-md space-y-4">
                <ProgressItem
                  label="Candidate Density"
                  value="High"
                  valueClass="text-tertiary"
                  barClass="bg-tertiary"
                  widthClass="w-3/4"
                />

                <ProgressItem
                  label="Salary Competitiveness"
                  value="Above Market"
                  valueClass="text-secondary"
                  barClass="bg-secondary"
                  widthClass="w-4/5"
                />
              </div>

              <div className="relative z-10 mt-md rounded-lg bg-surface-container p-3">
                <p className="text-[11px] italic text-on-surface-variant">
                  &quot;This role matches approximately 4,200 active candidates
                  in your primary region.&quot;
                </p>
              </div>
            </div>

            {/* Hiring Score Badge */}
            <div className="flex items-center justify-between rounded-xl border border-outline-variant bg-white p-lg">
              <div>
                <p className="text-xs font-bold uppercase text-on-surface-variant">
                  Success Predictor
                </p>
                <p className="text-2xl font-bold text-on-surface">
                  82
                  <span className="text-sm text-on-surface-variant">%</span>
                </p>
              </div>

              <div className="relative h-16 w-16">
                <svg className="h-full w-full -rotate-90">
                  <circle
                    className="text-surface-container-high"
                    cx="32"
                    cy="32"
                    fill="transparent"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <circle
                    className="text-emerald-500"
                    cx="32"
                    cy="32"
                    fill="transparent"
                    r="28"
                    stroke="currentColor"
                    strokeDasharray="175.9"
                    strokeDashoffset="31.6"
                    strokeWidth="4"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl text-emerald-500">
                    trending_up
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}

function TipCard({
  icon,
  text,
}: {
  icon: string;
  text: ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-tertiary-container/20 bg-tertiary-container/10 p-3">
      <span className="material-symbols-outlined text-lg text-tertiary-container">
        {icon}
      </span>
      <p className="text-xs leading-relaxed text-on-surface-variant">{text}</p>
    </div>
  );
}

function ProgressItem({
  label,
  value,
  valueClass,
  barClass,
  widthClass,
}: {
  label: string;
  value: string;
  valueClass: string;
  barClass: string;
  widthClass: string;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-on-surface-variant">{label}</span>
        <span className={`font-bold ${valueClass}`}>{value}</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
        <div className={`h-full rounded-full ${barClass} ${widthClass}`} />
      </div>
    </div>
  );
}