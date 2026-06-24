from fastapi import APIRouter, HTTPException
from models import JDExtractRequest, JDExtractResponse, ExtractedSkillOut
from ml.jd_skill_extractor import JDSkillExtractor

_extractor: JDSkillExtractor | None = None


def get_extractor(use_zero_shot: bool = False) -> JDSkillExtractor:
    global _extractor
    if _extractor is None:
        try:
            _extractor = JDSkillExtractor(use_zero_shot=use_zero_shot)
        except Exception as e:
            raise RuntimeError(f"Failed to load spaCy model: {e}")
    return _extractor


router = APIRouter()


@router.post("/extract", response_model=JDExtractResponse)
def extract_jd_skills(req: JDExtractRequest):
    if not req.jd_text.strip():
        raise HTTPException(status_code=400, detail="jd_text cannot be empty")
    try:
        extractor = get_extractor(use_zero_shot=req.use_zero_shot)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    try:
        result = extractor.extract(req.jd_text)
        return JDExtractResponse(
            role_title=result.role_title,
            role_category=result.role_category,
            experience_level=result.experience_level,
            min_years=result.min_years,
            max_years=result.max_years,
            must_have_skills=[ExtractedSkillOut(**s.__dict__) for s in result.must_have_skills],
            nice_to_have_skills=[ExtractedSkillOut(**s.__dict__) for s in result.nice_to_have_skills],
            negative_signals=result.negative_signals,
            all_skills=result.all_skills,
            summary=result.summary,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Extraction failed: {e}")
