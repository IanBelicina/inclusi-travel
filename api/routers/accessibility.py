from fastapi import APIRouter, Depends, HTTPException
from queries.accessibility import (
    AccessibilityIn,
    AccessibilityOut,
    AcessibilityQueries,
    AccessibilityListOut,
)
from psycopg.errors import ForeignKeyViolation
from authenticator import authenticator

router = APIRouter()


@router.post("/api/accessibility", response_model=AccessibilityOut)
def create_acessibility(
    accessibility: AccessibilityIn,
    queries: AcessibilityQueries = Depends(),
    dict=Depends(authenticator.get_current_account_data),
):
    try:
        return queries.create_accessibility(accessibility)
    except ForeignKeyViolation:
        raise HTTPException(status_code=400)


@router.get("/api/acessibility", response_model=AccessibilityListOut)
def get_accessibilities(queries: AcessibilityQueries = Depends()):
    return {"accessibilities": queries.get_all_accessibilities()}
