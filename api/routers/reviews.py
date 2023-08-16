from fastapi import APIRouter, Depends, Response, HTTPException
from pydantic import BaseModel
from typing import Optional
from queries.reviews import  ReviewIn, ReviewOut, ReviewQueries, ReviewListOut

router = APIRouter()



# Get all the reviews
@router.get("/api/reviews", response_model= ReviewListOut)
def get_reviews(
    queries: ReviewQueries = Depends()
):
    return{"reviews": queries.get_all_reviews()}
    


#create a reveiw
@router.post("/api/reviews", response_model= ReviewOut)
def create_review(
    review: ReviewIn,
    queries: ReviewQueries = Depends(),
):
    
    return queries.create_review(review)