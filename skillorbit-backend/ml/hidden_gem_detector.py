import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import DBSCAN
import warnings
warnings.filterwarnings("ignore")


class HiddenGemDetector:
    ANOMALY_FEATURES = [
        "learningVelocity", "careerGrowthRate", "githubActivity",
        "openSourcePRs", "careerGrowth",
    ]

    CLUSTER_FEATURES = [
        "technicalFit", "skillMatch", "experienceLevel",
        "learningVelocity", "careerGrowthRate",
    ]

    def __init__(
        self,
        success_threshold: float = 75.0,
        skill_gap_max: float = 55.0,
        velocity_min: float = 0.65,
        if_contamination: float = 0.08,
        dbscan_eps: float = 0.45,
        dbscan_min_samples: int = 4,
        weights: dict = None,
    ):
        self.success_threshold = success_threshold
        self.skill_gap_max = skill_gap_max
        self.velocity_min = velocity_min

        self.iso_forest = IsolationForest(
            n_estimators=200, contamination=if_contamination, random_state=42
        )
        self.dbscan = DBSCAN(eps=dbscan_eps, min_samples=dbscan_min_samples)
        self.scaler_anomaly = MinMaxScaler()
        self.scaler_cluster = MinMaxScaler()

        self.weights = weights or {
            "rule_based": 0.45,
            "isolation_forest": 0.30,
            "dbscan_outlier": 0.25,
        }
        assert abs(sum(self.weights.values()) - 1.0) < 1e-6
        self._fitted = False

    def _rule_based_flags(self, df: pd.DataFrame) -> pd.Series:
        success_norm = (df["successScore"] - 30) / 70
        skill_gap_norm = 1 - (df["skillMatch"] / 100)
        velocity_norm = df["learningVelocity"]
        growth_norm = (df["careerGrowthRate"].clip(-0.2, 2) + 0.2) / 2.2

        signal = (
            0.35 * success_norm + 0.30 * skill_gap_norm +
            0.20 * velocity_norm + 0.15 * growth_norm
        )

        hard_gate = (
            (df["successScore"] >= self.success_threshold) &
            (df["skillMatch"] <= self.skill_gap_max) &
            (df["learningVelocity"] >= self.velocity_min)
        )

        signal = signal.where(hard_gate, signal * 0.3)
        return signal.clip(0, 1)

    def _isolation_forest_flags(self, df: pd.DataFrame) -> pd.Series:
        X = self.scaler_anomaly.transform(df[self.ANOMALY_FEATURES])
        raw_scores = self.iso_forest.decision_function(X)
        gem_signal = 1 - MinMaxScaler().fit_transform(
            raw_scores.reshape(-1, 1)
        ).flatten()
        return pd.Series(gem_signal, index=df.index)

    def _dbscan_outlier_flags(self, df: pd.DataFrame) -> pd.Series:
        X = self.scaler_cluster.transform(df[self.CLUSTER_FEATURES])
        labels = self.dbscan.fit_predict(X)
        return pd.Series((labels == -1).astype(float), index=df.index)

    def fit(self, df: pd.DataFrame) -> "HiddenGemDetector":
        self.scaler_anomaly.fit(df[self.ANOMALY_FEATURES])
        self.scaler_cluster.fit(df[self.CLUSTER_FEATURES])
        X_anomaly = self.scaler_anomaly.transform(df[self.ANOMALY_FEATURES])
        self.iso_forest.fit(X_anomaly)
        self._fitted = True
        return self

    def detect(self, df: pd.DataFrame, top_k: int = 20) -> pd.DataFrame:
        if not self._fitted:
            raise RuntimeError("Call .fit(df) first.")

        df = df.copy()
        df["signal_rule"] = self._rule_based_flags(df)
        df["signal_iforest"] = self._isolation_forest_flags(df)
        df["signal_dbscan"] = self._dbscan_outlier_flags(df)

        df["gem_score"] = (
            self.weights["rule_based"] * df["signal_rule"] +
            self.weights["isolation_forest"] * df["signal_iforest"] +
            self.weights["dbscan_outlier"] * df["signal_dbscan"]
        ) * 100

        df["gem_score"] = df["gem_score"].round(1)

        gems = (
            df.sort_values("gem_score", ascending=False)
            .head(top_k)
            .reset_index(drop=True)
        )
        gems["gem_rank"] = gems.index + 1
        gems["gem_reason"] = gems.apply(self._explain, axis=1)

        return gems

    def _explain(self, row: pd.Series) -> str:
        reasons = []

        if row["successScore"] >= self.success_threshold and row["skillMatch"] <= self.skill_gap_max:
            reasons.append(
                f"High potential (successScore {row['successScore']:.0f}) "
                f"despite low traditional skill match ({row['skillMatch']:.0f})"
            )
        if row["learningVelocity"] >= self.velocity_min:
            reasons.append(
                f"Rapid learner with growth rate {row['careerGrowthRate']:.1f}x"
            )
        if row["signal_iforest"] >= 0.7:
            reasons.append("Anomalous growth profile vs peer group")
        if row["signal_dbscan"] == 1.0:
            reasons.append("Structurally unique profile")

        return " | ".join(reasons) if reasons else "Multi-signal gem candidate"
