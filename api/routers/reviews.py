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

@router.delete("/api/reviews/{id}/", response_model =bool)
def delete_review(
    id: int,
    queries: ReviewQueries = Depends()
):
    queries.delete_review(id)
    return True

@router.get("/api/reviews/{id}", response_model= ReviewOut)
def get_review(
        id:int,
        queries: ReviewQueries = Depends()
):
    record = queries.get_review(id)
    if record is None:
        raise HTTPException(status_code=404, detail="No review found with id {}".format(id))
    else:
        return record