from fastapi import APIRouter, Depends, Response, HTTPException
from pydantic import BaseModel
from typing import Optional
from queries.reviews import  ReviewIn, ReviewOut, ReviewQueries, ReviewListOut
from authenticator import authenticator

router = APIRouter()



# Get all the reviews
@router.get("/api/reviews", response_model= ReviewListOut)
def get_reviews(
    queries: ReviewQueries = Depends(),
    dict = Depends(authenticator.get_current_account_data),
):
    
    reviews = queries.get_all_reviews()
    if not reviews:
        raise HTTPException(status_code=404, detail="No reviews found")
    
    return{"reviews": queries.get_all_reviews()}
    


#create a reveiw
@router.post("/api/reviews", response_model= ReviewOut)
def create_review(
    review: ReviewIn,
    queries: ReviewQueries = Depends(),
    dict = Depends(authenticator.get_current_account_data),
):
    
    return queries.create_review(review)

#Delete a review
@router.delete("/api/reviews/{id}", response_model =bool)
def delete_review(
    id: int,
    queries: ReviewQueries = Depends(),
    dict = Depends(authenticator.get_current_account_data),
):
    review = queries.get_review(id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    queries.delete_review(id)
    return True

#get revie
@router.get("/api/reviews/{id}", response_model= ReviewOut)
def get_review(
        id:int,
        queries: ReviewQueries = Depends(),
        dict = Depends(authenticator.get_current_account_data),
):
    record = queries.get_review(id)
    if record is None:
        raise HTTPException(status_code=404, detail="No review found with id {}".format(id))
    else:
        return record
    

    #update review
@router.put("/api/reviews/{id}", response_model=Optional[ReviewOut])
def update_review(
    id: int,
    updated_review: ReviewIn,
    queries: ReviewQueries = Depends(),
    dict = Depends(authenticator.get_current_account_data),
):
    existing_review = queries.get_review(id)
    if existing_review is None:
        raise HTTPException(status_code=404, detail="No review found with id {}".format(id))

    updated_review_out = queries.update_review(id, updated_review)
    if updated_review_out is None:
        raise HTTPException(status_code=500, detail="Failed to update review")

    return updated_review_out

@router.get("/api/locations/{location_id}/average_rating", response_model=float)
def get_average_rating(
    location_id: int,
    queries: ReviewQueries = Depends()
):
    average_rating = queries.get_average_rating_for_location(location_id)
    if average_rating is None:
        raise HTTPException(status_code=404, detail="Location not found or no reviews available for location")

    return queries.get_average_rating_for_location(location_id)