from pydantic import BaseModel
from typing import Optional


class Candidate(BaseModel):
    id: str
    name: str
    role: str
    company: str
    location: str
    experience: str
    technicalFit: float = 0
    skillMatch: float = 0
    experienceMatch: float = 0
    recruitability: float = 0
    careerGrowth: float = 0
    learningVelocity: float = 0
    successScore: float = 0
    hiddenGem: Optional[bool] = None
    skills: list[str] = []
    reason: str = ""


class Job(BaseModel):
    id: str
    title: str
    roleCategory: str
    location: str
    experienceRange: str
    status: str
    candidatesScanned: int
    topScore: int


class ShortlistItem(BaseModel):
    rank: int
    candidateId: str
    candidateName: str
    successScore: float
    technicalFit: float
    recruitability: float
    reason: str


class DashboardStats(BaseModel):
    totalCandidatesIndexed: int
    activeJobs: int
    rankedShortlists: int
    avgSuccessScore: float
    hiddenGemsFound: int


class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    token: str
    user: dict


class JobCreate(BaseModel):
    title: str = "Untitled Role"
    roleCategory: str = "Engineering"
    location: str = "Remote"
    experienceRange: str = "3-5 years"


class RankRequest(BaseModel):
    job_description: str
    top_k: int = 20
    min_score: float = 0.0


class RankResult(BaseModel):
    rank: int
    id: str
    name: str
    role: str
    company: str
    yoe: float
    skills: str
    location: str
    semantic_sim: float
    technicalFit: float
    skillMatch: float
    experienceLevel: float
    careerGrowth: float
    cultureSignal: float
    successScore: float
    final_score: float


class SimilarCandidate(BaseModel):
    id: str
    name: str
    role: str
    company: str
    skills: str
    similarity: float


class JDExtractRequest(BaseModel):
    jd_text: str
    use_zero_shot: bool = False


class ExtractedSkillOut(BaseModel):
    name: str
    category: str
    is_must_have: bool
    is_nice_to_have: bool
    context: str
    confidence: float


class JDExtractResponse(BaseModel):
    role_title: str
    role_category: str
    experience_level: str
    min_years: Optional[int] = None
    max_years: Optional[int] = None
    must_have_skills: list[ExtractedSkillOut] = []
    nice_to_have_skills: list[ExtractedSkillOut] = []
    negative_signals: list[str] = []
    all_skills: list[str] = []
    summary: dict = {}


# ── Feature 4: Hidden Gem Detection ──────────────────────────────────

class HiddenGemDetectRequest(BaseModel):
    top_k: int = 20


class HiddenGemResult(BaseModel):
    gem_rank: int
    id: str
    name: str
    role: str
    company: str
    successScore: float
    skillMatch: float
    learningVelocity: float
    gem_score: float
    gem_reason: str


class HiddenGemDetectResponse(BaseModel):
    gems: list[HiddenGemResult]


# ── Feature 5: Explainability ────────────────────────────────────────

class ExplainCandidateRequest(BaseModel):
    candidate: dict
    top_n: int = 5


class ShapFeature(BaseModel):
    feature: str
    raw_key: str
    shap_value: float
    candidate_value: float
    impact: str


class ExplainCandidateResponse(BaseModel):
    score: float
    base_value: float
    top_drivers: list[ShapFeature]
    top_detractors: list[ShapFeature]
    all_shap: dict


class CompareCandidatesRequest(BaseModel):
    candidate_a: dict
    candidate_b: dict
    name_a: str = "Candidate A"
    name_b: str = "Candidate B"


class KeyDifference(BaseModel):
    feature: str
    delta: float
    favors: str


class CompareCandidatesResponse(BaseModel):
    winner: str
    score_a: float
    score_b: float
    score_delta: float
    key_differences: list[KeyDifference]


class GlobalImportanceItem(BaseModel):
    feature: str
    mean_abs_shap: float


class GlobalImportanceResponse(BaseModel):
    importance: list[GlobalImportanceItem]


class CopilotExplanationRequest(BaseModel):
    candidate: dict
    name: str = "This candidate"


class CopilotExplanationResponse(BaseModel):
    explanation: str
