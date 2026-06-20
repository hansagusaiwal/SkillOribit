import { Link } from "react-router-dom";
import type { Candidate } from "../../types";
import ScoreBadge from "./ScoreBadge";
import SkillTag from "./SkillTag";

type CandidateRowProps = {
  candidate: Candidate;
  rank: number;
};

export default function CandidateRow({ candidate, rank }: CandidateRowProps) {
  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-violet-50/40">
      <td className="px-5 py-4 text-sm font-bold text-slate-600">#{rank}</td>

      <td className="px-5 py-4">
        <div>
          <p className="font-bold text-slate-950">{candidate.name}</p>
          <p className="text-sm text-slate-500">{candidate.role}</p>
          {candidate.hiddenGem && (
            <span className="mt-2 inline-flex rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">
              Hidden Gem
            </span>
          )}
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">{candidate.experience}</td>

      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          {candidate.skills.slice(0, 3).map((skill) => (
            <SkillTag key={skill} tone="green">
              {skill}
            </SkillTag>
          ))}
        </div>
      </td>

      <td className="px-5 py-4 text-sm font-semibold text-slate-700">{candidate.technicalFit}%</td>
      <td className="px-5 py-4 text-sm font-semibold text-slate-700">{candidate.recruitability}%</td>
      <td className="px-5 py-4">
        <ScoreBadge score={candidate.successScore} />
      </td>

      <td className="px-5 py-4">
        <Link
          to={`/candidate-profile/${candidate.id}`}
          className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          View
        </Link>
      </td>
    </tr>
  );
}