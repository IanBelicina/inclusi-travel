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


@router.get("/reviews/comments/{comment_id}", response_model = Union[CommentOut,Error])
def get_comment(
    comment_id:int,
    repo: CommentRepository = Depends()
):
    return repo.get_comment(comment_id)


@router.post("/reviews/comments", response_model = bool)
def create_comment(
    comment:CommentIn,
    repo: CommentRepository = Depends()
):
    return repo.create_comment(comment)
