# SkillOrbit

AI-powered recruitment platform that ranks, analyzes, and explains candidate-job fit using ensemble ML models, NLP embeddings, vector search, and LLM-powered insights.

## Project Overview

SkillOrbit is an end-to-end AI recruitment assistant that helps recruiters discover, rank, and understand talent. It combines XGBoost-based success prediction with semantic search (SentenceTransformers + FAISS), SHAP explainability, hidden gem detection, talent archetype clustering, and a Groq-powered RAG copilot — all accessible through a modern React dashboard.

## Features

- **AI Candidate Ranking** — Hybrid ranking combining semantic JD–candidate similarity with multi-dimensional ML scores (technical fit, skill match, career growth, culture signal)
- **Deep JD Understanding** — Extracts must-have/nice-to-have skills, experience level, role category, and years from job descriptions via regex + spaCy NER + optional BART zero-shot classification
- **Candidate DNA Scoring** — 14 ML features → 5 dimension sub-scores + learningVelocity per candidate
- **SHAP Explainability** — Per-candidate prediction breakdown showing top drivers and detractors
- **Hidden Gem Detection** — Ensemble of rule-based + Isolation Forest + DBSCAN signals to surface overlooked high-potential candidates
- **Talent Twin Archetypes** — K-means clustering (k=6) classifying candidates into archetypes (Startup Founder-Engineer, Big-Co ML Specialist, etc.) with twin finding and benchmark analysis
- **Recruiter Copilot** — RAG chatbot over the candidate knowledge base powered by Groq LLM (llama-3.3-70b-versatile) with intent routing and fallback templates
- **Recruitability Prediction** — XGBoost classifier predicting candidate openness to contact with urgency flags
- **Behavioral Signal Analysis** — Keyword + numeric fusion scoring across 6 soft-skill dimensions (collaboration, problem-solving, ownership, etc.)
- **Market Insights** — Supply/demand ratio, competition index, Holt-Winters 3-month forecasting, and opportunity scoring by skill cluster and location

## Screenshots

<!-- TODO: Add screenshots -->
| Page | Preview |
|------|---------|
| Candidate Discovery & Ranking | _— add screenshot —_ |
| Candidate Detail & SHAP Explainability | _— add screenshot —_ |
| Dashboard Analytics | _— add screenshot —_ |
| Recruiter Copilot Chat | _— add screenshot —_ |

## Tech Stack

### Backend
| Category | Technologies |
|----------|-------------|
| API Framework | FastAPI, Uvicorn, Pydantic |
| ML Models | XGBoost (Regressor + Classifier), scikit-learn (KMeans, PCA, Isolation Forest, DBSCAN, LinearRegression) |
| NLP & Embeddings | Sentence-Transformers (`all-MiniLM-L6-v2`), spaCy (`en_core_web_sm`), HuggingFace Transformers (BART) |
| Vector Search | FAISS (`IndexFlatIP`) |
| Explainability | SHAP (TreeExplainer) |
| LLM | Groq API (`llama-3.3-70b-versatile`) |
| Time Series | statsmodels (Holt-Winters Exponential Smoothing) |
| Data Processing | Pandas, NumPy, Joblib, imbalanced-learn (SMOTE) |

### Frontend
| Category | Technologies |
|----------|-------------|
| Framework | React 19, TypeScript 6, Vite 8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| Icons | Lucide React |

### Storage
| Item | Format |
|------|--------|
| Candidate dataset | JSONL flat files |
| Serialized models | Joblib/Pickle (.pkl) |
| Embeddings | NumPy (.npy) |
| Vector index | FAISS index |
| Copilot cache | Joblib cache (`.pkl`) |

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                     Frontend (React + TypeScript)                 │
│                                                                  │
│  ┌──────────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │  Candidate   │  │Dashboard │  │Shortlist │  │  Copilot   │  │
│  │  Discovery   │  │  Page    │  │  Page    │  │  Chat UI   │  │
│  └──────┬───────┘  └──────────┘  └──────────┘  └──────┬─────┘  │
└─────────┼──────────────────────────────────────────────┼────────┘
          │           REST API (JSON)                     │
┌─────────▼──────────────────────────────────────────────▼────────┐
│                      Backend (FastAPI)                            │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐ │
│  │  Ranking Module  │  │  JD Skill       │  │  Hidden Gem      │ │
│  │                  │  │  Extractor      │  │  Detector        │ │
│  │  SBERT + FAISS  │  │  spaCy + BART   │  │  IsolationForest │ │
│  │  XGBoost → score │  │  regex taxonomy │  │  + DBSCAN + rule │ │
│  │  + dim blend    │  │  → skills/level │  │  → gem_score     │ │
│  └────────┬────────┘  └─────────────────┘  └──────────────────┘ │
│           │                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐ │
│  │  Talent Twin     │  │  Recruitability │  │  Copilot (RAG)   │ │
│  │                 │  │  Predictor      │  │                  │ │
│  │  KMeans → arch  │  │  XGBoost Class  │  │  SBERT + FAISS   │ │
│  │  Cosine Sim     │  │  + SMOTE        │  │  + Groq LLM      │ │
│  │  → twins/bench  │  │  → prob/label   │  │  → answer        │ │
│  └─────────────────┘  └─────────────────┘  └──────────────────┘ │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐ │
│  │  Market Insights │  │  Behavioral     │  │  SHAP            │ │
│  │                 │  │  Signals        │  │  Explainability  │ │
│  │  Holt-Winters   │  │  keyword+numeric│  │  TreeExplainer   │ │
│  │  LinReg trend   │  │  → 6 dimensions │  │  → drivers/detr  │ │
│  │  → forecast     │  │  → scores       │  │  → global imp    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────────┘ │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Data Layer                                                │   │
│  │  JSONL → 14 ML features → Batch Score (XGBoost) →         │   │
│  │  → Encode (SBERT) → FAISS Index (in-memory)               │   │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

## Installation

### Prerequisites
- Python 3.12+
- Node.js 20+
- Groq API key (for Copilot)

### Backend Setup
```bash
cd skillorbit-backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Build FAISS index and precompute scores
python -m ml.build_ranker

# Configure environment
cp .env.example .env
# Edit .env and set GROQ_API_KEY=your_key_here

# Start the API server
uvicorn main:app --port 3001 --reload
```

### Frontend Setup
```bash
cd skillorbit-frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and the API at `http://localhost:3001`.

## Live Demo

<!-- TODO: Add live demo link -->
[Live Demo](https://skill-oribit-2.vercel.app/)

## Contributors

- [Harsh Gahankar](https://github.com/harshgahankar)
- [Hansa Gusaiwal](https://github.com/hansagusaiwal)
- [Roshni Gupta](https://github.com/hansagusaiwal)

---

Built with FastAPI, React, XGBoost, SentenceTransformers, FAISS, and Groq.
