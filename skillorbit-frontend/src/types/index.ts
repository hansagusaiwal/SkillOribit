export type Candidate = {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  experience: string;
  technicalFit: number;
  skillMatch: number;
  experienceMatch: number;
  recruitability: number;
  careerGrowth: number;
  learningVelocity: number;
  successScore: number;
  hiddenGem?: boolean;
  skills: string[];
  reason: string;
};

export type Job = {
  id: string;
  title: string;
  roleCategory: string;
  location: string;
  experienceRange: string;
  status: "Active" | "Draft" | "Completed";
  candidatesScanned: number;
  topScore: number;
};

export type ShortlistItem = {
  rank: number;
  candidateId: string;
  candidateName: string;
  successScore: number;
  technicalFit: number;
  recruitability: number;
  reason: string;
};