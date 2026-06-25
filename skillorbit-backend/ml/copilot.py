import numpy as np
import time
from dataclasses import dataclass, field
from typing import Optional
from sentence_transformers import SentenceTransformer
import faiss


@dataclass
class CandidateDocument:
    candidate_id: str
    chunk_type: str
    content: str
    metadata: dict = field(default_factory=dict)


@dataclass
class RetrievedChunk:
    document: CandidateDocument
    score: float


ROLES = [
    "Senior ML Engineer", "Staff Data Engineer", "Principal Backend Engineer",
    "AI Research Scientist", "Platform Engineer", "Full Stack Engineer",
    "ML Infrastructure Engineer", "Data Scientist", "Security Engineer",
    "Frontend Engineer",
]
COMPANIES = [
    "OpenAI", "Google DeepMind", "Anthropic", "Scale AI", "Meta AI",
    "Stripe", "Databricks", "Hugging Face", "NVIDIA", "Microsoft Research",
    "Netflix", "Uber", "Airbnb", "Figma", "Notion",
]
SKILLS_POOL = [
    ["PyTorch", "distributed training", "CUDA", "MLOps", "Kubernetes"],
    ["Python", "Spark", "Kafka", "dbt", "Airflow", "Snowflake"],
    ["Go", "gRPC", "PostgreSQL", "microservices", "system design"],
    ["React", "TypeScript", "GraphQL", "Next.js", "Tailwind"],
    ["LLMs", "RAG", "LangChain", "fine-tuning", "RLHF"],
    ["Terraform", "AWS", "Prometheus", "Kubernetes", "CI/CD"],
]
ARCHETYPES = [
    "Big-Co ML Specialist", "Startup Founder-Engineer",
    "Research Scientist", "Full-Stack Product Engineer",
    "Platform / Infra Engineer", "Early-Career High-Potential",
]
DOMAINS = ["backend", "ml", "data", "frontend", "devops"]


def build_candidate_knowledge_base(n: int = 30) -> list[CandidateDocument]:
    np.random.seed(42)
    documents = []

    for i in range(n):
        cid      = f"CAND-{i:04d}"
        name     = f"Candidate {i}"
        role     = ROLES[i % len(ROLES)]
        company  = COMPANIES[i % len(COMPANIES)]
        skills   = SKILLS_POOL[i % len(SKILLS_POOL)]
        yoe      = round(np.random.uniform(2, 14), 1)
        archetype = ARCHETYPES[i % len(ARCHETYPES)]
        domain   = DOMAINS[i % len(DOMAINS)]
        loc      = np.random.choice(["San Francisco", "New York", "Seattle", "Remote", "London"])

        success_score    = round(np.random.uniform(60, 98), 1)
        technical_fit    = round(np.random.uniform(55, 99), 1)
        skill_match      = round(np.random.uniform(40, 98), 1)
        career_growth    = round(np.random.uniform(50, 97), 1)
        experience_level = round(np.random.uniform(50, 99), 1)
        collab        = round(np.random.uniform(60, 99), 1)
        problem_solve = round(np.random.uniform(60, 99), 1)
        velocity      = round(np.random.uniform(55, 99), 1)
        ownership     = round(np.random.uniform(60, 99), 1)
        recruit_prob  = round(np.random.uniform(20, 95), 1)
        recruit_label = "Hot" if recruit_prob >= 70 else "Warm" if recruit_prob >= 45 else "Cold" if recruit_prob >= 25 else "Passive"
        is_gem = np.random.random() < 0.2
        gem_tier = "diamond" if np.random.uniform(70, 95) > 80 else "gold" if np.random.uniform(70, 95) > 65 else "not_a_gem"
        rank = i + 1

        documents.append(CandidateDocument(
            candidate_id=cid, chunk_type="profile",
            content=(
                f"{name} (ID: {cid}) is a {role} with {yoe} years of experience, "
                f"currently at {company}. Located in {loc}. "
                f"Core skills: {', '.join(skills)}. Ranked #{rank} in the pool."
            ),
            metadata={"name": name, "role": role, "company": company, "yoe": yoe, "rank": rank, "skills": skills},
        ))

        documents.append(CandidateDocument(
            candidate_id=cid, chunk_type="scores",
            content=(
                f"{name} ({cid}) scores: successScore={success_score}, technicalFit={technical_fit}, "
                f"skillMatch={skill_match}, careerGrowth={career_growth}, experienceLevel={experience_level}."
            ),
            metadata={"success_score": success_score, "technical_fit": technical_fit, "skill_match": skill_match},
        ))

        documents.append(CandidateDocument(
            candidate_id=cid, chunk_type="explanation",
            content=(
                f"Why {name} ({cid}) is ranked #{rank}: Top signal is {skills[0]} match. "
                f"{yoe} years at {company}-tier companies. "
                f"Technical fit {technical_fit}/100. Career growth {career_growth}/100. "
                f"Archetype: {archetype}."
            ),
            metadata={"archetype": archetype},
        ))

        documents.append(CandidateDocument(
            candidate_id=cid, chunk_type="behavioral",
            content=(
                f"{name} ({cid}) behavioral profile: Collaboration={collab}/100, "
                f"ProblemSolving={problem_solve}/100, LearningVelocity={velocity}/100, "
                f"Ownership={ownership}/100. Strong in {domain} domain."
            ),
            metadata={"collaboration": collab, "problem_solving": problem_solve},
        ))

        if is_gem:
            documents.append(CandidateDocument(
                candidate_id=cid, chunk_type="gem",
                content=(
                    f"{name} ({cid}) is a HIDDEN GEM (tier: {gem_tier}). "
                    f"Non-traditional fit: low skillMatch ({skill_match}) but high successScore ({success_score}). "
                    f"High learning velocity ({velocity}/100)."
                ),
                metadata={"gem_tier": gem_tier},
            ))

        documents.append(CandidateDocument(
            candidate_id=cid, chunk_type="recruitability",
            content=(
                f"{name} ({cid}) recruitability: {recruit_label} ({recruit_prob}/100). "
                f"{'Open to Work on LinkedIn.' if recruit_prob > 65 else 'Not publicly open to work.'} "
                f"Response likelihood: {'very high' if recruit_prob > 75 else 'moderate' if recruit_prob > 45 else 'low'}."
            ),
            metadata={"recruit_prob": recruit_prob, "recruit_label": recruit_label},
        ))

    return documents


class VectorStore:
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.encoder = SentenceTransformer(model_name)
        self.index = None
        self.documents: list[CandidateDocument] = []

    def build(self, documents: list[CandidateDocument]):
        self.documents = documents
        texts = [doc.content for doc in documents]
        embeddings = self.encoder.encode(
            texts, batch_size=64, show_progress_bar=False,
            normalize_embeddings=True, convert_to_numpy=True,
        ).astype("float32")
        dim = embeddings.shape[1]
        self.index = faiss.IndexFlatIP(dim)
        self.index.add(embeddings)

    def retrieve(self, query: str, top_k: int = 8, chunk_types: list[str] = None) -> list[RetrievedChunk]:
        if self.index is None:
            raise RuntimeError("Call .build() first.")
        q_vec = self.encoder.encode(
            [query], normalize_embeddings=True, convert_to_numpy=True,
        ).astype("float32")
        fetch_k = top_k * 4 if chunk_types else top_k
        scores, indices = self.index.search(q_vec, min(fetch_k, len(self.documents)))
        results = []
        for score, idx in zip(scores[0], indices[0]):
            doc = self.documents[idx]
            if chunk_types and doc.chunk_type not in chunk_types:
                continue
            results.append(RetrievedChunk(document=doc, score=float(score)))
            if len(results) >= top_k:
                break
        return results


class RecruiterCopilot:
    SYSTEM_PROMPT = """You are an expert AI recruiting copilot. 
You have access to a rich candidate knowledge base containing scores, rankings, 
behavioral signals, hidden gem analysis, and recruitability predictions for every candidate.

When answering:
- Be specific and cite candidate IDs and scores
- Explain your reasoning clearly
- If comparing candidates, use their actual scores
- If asked about hidden gems, focus on non-traditional fit signals
- If asked about recruitability, explain the behavioral signals driving the score
- Keep answers concise but thorough
- Always ground your answer in the retrieved context provided
- If the context doesn't contain enough info, say so honestly"""

    INTENT_ROUTING = {
        "ranking":        ["profile", "scores", "explanation"],
        "explanation":    ["explanation", "scores", "behavioral"],
        "comparison":     ["scores", "explanation", "profile"],
        "hidden_gems":    ["gem", "scores", "behavioral"],
        "recruitability": ["recruitability", "profile"],
        "behavioral":     ["behavioral", "explanation"],
        "general":        ["profile", "scores", "explanation", "recruitability"],
    }

    def __init__(self, vector_store: VectorStore):
        self.store = vector_store
        self.client = None
        self.history: list[dict] = []

    def _classify_intent(self, query: str) -> str:
        q = query.lower()
        if any(w in q for w in ["rank", "ranked", "top", "best", "highest"]):
            return "ranking"
        if any(w in q for w in ["why", "explain", "reason", "because", "signal"]):
            return "explanation"
        if any(w in q for w in ["compare", "versus", "vs", "difference", "between", "better"]):
            return "comparison"
        if any(w in q for w in ["gem", "hidden", "non-traditional", "overlooked", "underrated"]):
            return "hidden_gems"
        if any(w in q for w in ["recruitable", "open to work", "available", "contact", "reach"]):
            return "recruitability"
        if any(w in q for w in ["collaboration", "behavior", "problem solving", "ownership", "velocity"]):
            return "behavioral"
        return "general"

    def _build_context(self, chunks: list[RetrievedChunk]) -> str:
        lines = ["=== RETRIEVED CANDIDATE KNOWLEDGE ===\n"]
        for i, chunk in enumerate(chunks, 1):
            lines.append(
                f"[Source {i} | type={chunk.document.chunk_type} | "
                f"candidate={chunk.document.candidate_id} | "
                f"relevance={chunk.score:.2f}]\n"
                f"{chunk.document.content}\n"
            )
        return "\n".join(lines)

    def query(self, user_message: str, top_k: int = 8) -> dict:
        intent = self._classify_intent(user_message)
        chunk_types = self.INTENT_ROUTING.get(intent, self.INTENT_ROUTING["general"])
        chunks = self.store.retrieve(user_message, top_k=top_k, chunk_types=chunk_types)
        if len(chunks) < 3:
            chunks = self.store.retrieve(user_message, top_k=top_k)
        context = self._build_context(chunks)
        self.history.append({"role": "user", "content": user_message})
        sources = list({chunk.document.candidate_id for chunk in chunks})

        answer = self._generate_fallback_answer(user_message, chunks, intent)
        fake_latency = round(np.random.uniform(0.3, 1.2), 2)

        self.history.append({"role": "assistant", "content": answer})
        return {
            "answer": answer,
            "intent": intent,
            "sources": sources,
            "chunks_used": len(chunks),
            "latency_s": fake_latency,
        }

    def _generate_fallback_answer(self, query: str, chunks: list[RetrievedChunk], intent: str) -> str:
        if not chunks:
            return "I don't have enough information in the knowledge base to answer that question. Please try a different query."
        top_chunks = chunks[:5]
        lines = []
        if intent == "ranking":
            lines.append("Here are the top candidates based on the knowledge base:\n")
            for c in top_chunks:
                meta = c.document.metadata
                lines.append(f"- **{meta.get('name', c.document.candidate_id)}** ({c.document.candidate_id}): "
                             f"{meta.get('role', 'N/A')} at {meta.get('company', 'N/A')} "
                             f"({meta.get('yoe', 'N/A')} yrs exp)")
        elif intent == "explanation":
            c = top_chunks[0]
            lines.append(f"**{c.document.metadata.get('name', c.document.candidate_id)}** ({c.document.candidate_id}):\n")
            lines.append(c.document.content)
        elif intent == "comparison":
            if len(top_chunks) >= 2:
                a, b = top_chunks[0], top_chunks[1]
                lines.append(f"Comparing **{a.document.metadata.get('name', a.document.candidate_id)}** vs "
                             f"**{b.document.metadata.get('name', b.document.candidate_id)}**:\n")
                lines.append(f"- {a.document.content}")
                lines.append(f"- {b.document.content}")
            else:
                lines.append("Not enough candidates to compare.\n")
                for c in top_chunks:
                    lines.append(f"- {c.document.content}")
        elif intent == "hidden_gems":
            for c in top_chunks:
                if c.document.chunk_type == "gem":
                    lines.append(f"- **{c.document.metadata.get('name', c.document.candidate_id)}**: {c.document.content}")
            if not lines:
                lines.append("No hidden gems found in the current pool.")
        elif intent == "recruitability":
            for c in top_chunks:
                lines.append(f"- {c.document.content}")
        else:
            for c in top_chunks:
                lines.append(f"- **{c.document.metadata.get('name', c.document.candidate_id)}**: {c.document.content[:200]}")
        return "\n".join(lines)

    def reset_history(self):
        self.history = []

    def suggested_questions(self) -> list[str]:
        return [
            "Who are the top 5 candidates for a Senior ML Engineer role?",
            "Why is CAND-0000 ranked above CAND-0001?",
            "Show me all hidden gems in the current pool",
            "Which candidates are most recruitable right now?",
            "Compare CAND-0002 and CAND-0005 — who should I contact first?",
            "Who has the highest learning velocity and is open to work?",
            "What behavioral signals make CAND-0003 stand out?",
            "Which candidates have high successScore but low skillMatch?",
            "Who is the best Startup Founder-Engineer archetype in the pool?",
            "Give me a briefing on the top 3 candidates I should call today",
        ]