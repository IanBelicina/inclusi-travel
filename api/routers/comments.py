from fastapi import APIRouter,Depends
from typing import Optional, Union,List
from queries.comments import CommentIn,CommentOut,Error,CommentRepository

router = APIRouter()


@router.get("/reviews/{review_id}/comments", response_model = Union[List[CommentOut],Error])
def get_all_review_comments(
    review_id:int,
    repo: CommentRepository = Depends()
):
    return repo.get_all_review_comments(review_id)


##################################### FOR STRETCH GOAL FEATURING ACTIVITY? ##################
# @router.get("/accounts/{account_id}/comments", response_model = Union[List[CommentOut],Error])
# def get_all_user_comments(
#     account_id:int,
#     repo: CommentRepository = Depends()
# ):
#     return repo.get_all_user_comments(account_id)
###############################################################################################
