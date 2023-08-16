from fastapi import APIRouter, Depends, Response, HTTPException
from pydantic import BaseModel
from typing import Optional
from queries.reviews import  ReviewIn

router = APIRouter()

@router.post("/reviews")
def create_review(review: ReviewIn):
    print("review", review.body)
    return review