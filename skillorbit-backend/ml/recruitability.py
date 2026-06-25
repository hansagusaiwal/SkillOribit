import numpy as np
import pandas as pd
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, roc_auc_score, average_precision_score, precision_recall_curve
from imblearn.over_sampling import SMOTE
import joblib
import warnings
warnings.filterwarnings("ignore")

FEATURE_COLS = [
    "months_at_current_company",
    "total_yoe",
    "num_companies",
    "avg_tenure_months",
    "github_commits_last_30d",
    "linkedin_profile_views_30d",
    "linkedin_updated_days_ago",
    "stackoverflow_activity_score",
    "recruiter_response_time_hrs",
    "opened_recruiter_emails",
    "clicked_job_links",
    "profile_completeness",
    "open_to_work_flag",
    "applied_other_jobs_30d",
    "attended_career_event",
    "below_market_salary_pct",
    "no_promotion_months",
]

FEATURE_LABELS = {
    "months_at_current_company":   "Months at current company",
    "total_yoe":                   "Total years of experience",
    "num_companies":               "Number of past companies",
    "avg_tenure_months":           "Avg tenure per company (months)",
    "github_commits_last_30d":     "GitHub commits (last 30 days)",
    "linkedin_profile_views_30d":  "LinkedIn profile views (30d)",
    "linkedin_updated_days_ago":   "Days since LinkedIn update",
    "stackoverflow_activity_score": "StackOverflow activity",
    "recruiter_response_time_hrs": "Recruiter response time (hrs)",
    "opened_recruiter_emails":     "Recruiter emails opened",
    "clicked_job_links":           "Job links clicked",
    "profile_completeness":        "Profile completeness",
    "open_to_work_flag":           "Open to Work (LinkedIn)",
    "applied_other_jobs_30d":      "Other applications (30d)",
    "attended_career_event":       "Attended career event",
    "below_market_salary_pct":     "% below market salary",
    "no_promotion_months":         "Months without promotion",
}


def generate_recruitability_data(n: int = 3000, seed: int = 42) -> pd.DataFrame:
    np.random.seed(seed)
    df = pd.DataFrame({
        "candidate_id": [f"CAND-{i:05d}" for i in range(n)],
        "months_at_current_company": np.random.exponential(24, n).clip(1, 120),
        "total_yoe":                 np.random.uniform(1, 18, n),
        "num_companies":             np.random.randint(1, 8, n).astype(float),
        "avg_tenure_months":         np.random.uniform(8, 60, n),
        "github_commits_last_30d":   np.random.poisson(12, n).astype(float),
        "linkedin_profile_views_30d": np.random.poisson(8, n).astype(float),
        "linkedin_updated_days_ago": np.random.exponential(90, n).clip(1, 730),
        "stackoverflow_activity_score": np.random.uniform(0, 1, n),
        "recruiter_response_time_hrs": np.random.exponential(48, n).clip(0.5, 720),
        "opened_recruiter_emails":     np.random.randint(0, 6, n).astype(float),
        "clicked_job_links":           np.random.randint(0, 4, n).astype(float),
        "profile_completeness":        np.random.uniform(0.4, 1.0, n),
        "open_to_work_flag":           np.random.choice([0, 1], n, p=[0.80, 0.20]).astype(float),
        "applied_other_jobs_30d":      np.random.randint(0, 5, n).astype(float),
        "attended_career_event":       np.random.choice([0, 1], n, p=[0.85, 0.15]).astype(float),
        "below_market_salary_pct":    np.random.uniform(-10, 40, n),
        "no_promotion_months":        np.random.exponential(18, n).clip(0, 60),
    })

    log_odds = (
        -2.0
        + 2.5  * df["open_to_work_flag"]
        + 1.5  * df["applied_other_jobs_30d"].clip(0, 4) / 4
        + 1.2  * df["attended_career_event"]
        - 0.03 * df["months_at_current_company"].clip(0, 48)
        + 0.02 * df["github_commits_last_30d"].clip(0, 40)
        + 0.04 * df["linkedin_profile_views_30d"].clip(0, 30)
        - 0.005 * df["linkedin_updated_days_ago"].clip(0, 365)
        - 0.015 * df["recruiter_response_time_hrs"].clip(0, 200)
        + 0.8  * df["opened_recruiter_emails"].clip(0, 5) / 5
        + 1.0  * df["clicked_job_links"].clip(0, 3) / 3
        + 0.5  * df["profile_completeness"]
        + 0.03 * df["below_market_salary_pct"].clip(0, 40)
        + 0.02 * df["no_promotion_months"].clip(0, 36)
        + np.random.normal(0, 0.5, n)
    )
    prob = 1 / (1 + np.exp(-log_odds))
    df["is_recruitable"] = (np.random.uniform(0, 1, n) < prob).astype(int)
    return df.round(3)


class RecruitabilityModel:
    LABELS = {
        "Hot":     (70, 100),
        "Warm":    (45, 70),
        "Cold":    (25, 45),
        "Passive": (0,  25),
    }

    def __init__(self, threshold: float = 0.40):
        self.threshold = threshold
        self.scaler    = StandardScaler()
        self.model     = XGBClassifier(
            n_estimators=300,
            max_depth=5,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            scale_pos_weight=3,
            use_label_encoder=False,
            eval_metric="logloss",
            random_state=42,
        )
        self._feature_importance = None
        self._fitted = False

    def fit(self, df: pd.DataFrame) -> "RecruitabilityModel":
        X = df[FEATURE_COLS].fillna(0).values
        y = df["is_recruitable"].values

        X_scaled = self.scaler.fit_transform(X)
        X_tr, X_val, y_tr, y_val = train_test_split(
            X_scaled, y, test_size=0.20, stratify=y, random_state=42
        )

        smote = SMOTE(random_state=42, k_neighbors=5)
        X_tr_res, y_tr_res = smote.fit_resample(X_tr, y_tr)

        self.model.fit(X_tr_res, y_tr_res, eval_set=[(X_val, y_val)], verbose=False)

        eval_results = self.model.evals_result()
        raw_imp = self.model.feature_importances_
        self._feature_importance = pd.DataFrame({
            "feature": FEATURE_COLS,
            "label": [FEATURE_LABELS[f] for f in FEATURE_COLS],
            "importance": raw_imp,
        }).sort_values("importance", ascending=False).reset_index(drop=True)

        self._fitted = True
        return self

    def predict_single(self, candidate: dict) -> dict:
        if not self._fitted:
            raise RuntimeError("Call .fit() first.")

        row = pd.DataFrame([{f: candidate.get(f, 0) for f in FEATURE_COLS}])
        X   = self.scaler.transform(row.fillna(0))
        prob  = float(self.model.predict_proba(X)[0, 1])
        score = round(prob * 100, 1)
        label = self._score_to_label(score)
        top_signals = self._top_signals(candidate)

        urgency = (
            candidate.get("open_to_work_flag", 0) == 1
            or candidate.get("applied_other_jobs_30d", 0) >= 2
            or (candidate.get("clicked_job_links", 0) >= 2
                and candidate.get("opened_recruiter_emails", 0) >= 2)
        )

        return {
            "recruitable_prob":  score,
            "recruitable_label": label,
            "top_signals":       top_signals,
            "urgency_flag":      urgency,
            "recommended_action": self._action(label, urgency),
        }

    def predict_batch(self, candidates: list[dict]) -> list[dict]:
        if not self._fitted:
            raise RuntimeError("Call .fit() first.")
        results = []
        for cand in candidates:
            result = self.predict_single(cand.get("features", cand))
            results.append({
                "candidate_id": cand.get("candidate_id", ""),
                "name": cand.get("name", ""),
                "recruitable_prob": result["recruitable_prob"],
                "recruitable_label": result["recruitable_label"],
                "urgency_flag": result["urgency_flag"],
            })
        return sorted(results, key=lambda x: -x["recruitable_prob"])

    def _score_to_label(self, score: float) -> str:
        for label, (lo, hi) in self.LABELS.items():
            if lo <= score < hi:
                return label
        return "Passive"

    def _top_signals(self, candidate: dict, top_n: int = 3) -> list[dict]:
        if self._feature_importance is None:
            return []
        signals = []
        positive_features = [
            "open_to_work_flag", "applied_other_jobs_30d",
            "attended_career_event", "github_commits_last_30d",
            "linkedin_profile_views_30d", "opened_recruiter_emails",
            "clicked_job_links", "below_market_salary_pct",
            "no_promotion_months",
        ]
        for _, row in self._feature_importance.head(8).iterrows():
            feat = row["feature"]
            val  = candidate.get(feat, 0)
            direction = "positive" if feat in positive_features else "negative"
            signals.append({
                "feature":   FEATURE_LABELS[feat],
                "value":     val,
                "direction": direction,
                "importance": round(float(row["importance"]), 4),
            })
        return sorted(signals, key=lambda x: -x["importance"])[:top_n]

    def _action(self, label: str, urgency: bool) -> str:
        actions = {
            "Hot":     "Reach out immediately — candidate likely actively looking",
            "Warm":    "Send personalised outreach within 48 hours",
            "Cold":    "Add to nurture sequence — check back in 30 days",
            "Passive": "Monitor only — likely not open to change right now",
        }
        base = actions.get(label, "Monitor candidate")
        if urgency and label in ("Hot", "Warm"):
            base += " (URGENT: multiple active signals detected)"
        return base

    def save(self, path: str = "recruitability_model.pkl"):
        joblib.dump(self, path)

    @staticmethod
    def load(path: str = "recruitability_model.pkl") -> "RecruitabilityModel":
        return joblib.load(path)