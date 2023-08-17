from fastapi import APIRouter
from queries.accessibility import AccessibilityIn, AccessibilityOut

router = APIRouter()

@router.post("/accessibility")
def create_acessibility(accessibility:AccessibilityIn):
    print("accessibility", accessibility.name)
    return accessibility
