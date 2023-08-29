from authenticator import authenticator
from fastapi import APIRouter, Depends, HTTPException
from typing import Union, List
from queries.comments import CommentIn, CommentOut, Error, CommentRepository

router = APIRouter()


@router.get(
    "/reviews/{review_id}/comments",
    response_model=Union[List[CommentOut], Error],
)
def get_all_review_comments(
    review_id: int,
    repo: CommentRepository = Depends(),
):
    comments = repo.get_all_review_comments(review_id)
    if isinstance(repo.get_all_review_comments(review_id), Error):
        raise HTTPException(
            status_code=404,
            detail="No comments found for review id {}".format(review_id),
        )
    else:
        return comments


@router.get(
    "/reviews/comments/{comment_id}", response_model=Union[CommentOut, Error]
)
def get_comment(
    comment_id: int,
    repo: CommentRepository = Depends(),
):
    if isinstance(repo.get_comment(comment_id), CommentOut):
        return repo.get_comment(comment_id)
    else:
        raise HTTPException(
            status_code=404,
            detail="No comments found with id {}".format(comment_id),
        )


@router.post("/reviews/comments", response_model=Union[CommentOut, Error])
def create_comment(
    comment: CommentIn,
    repo: CommentRepository = Depends(),
    dict=Depends(authenticator.get_current_account_data),
):
    return repo.create_comment(comment)


@router.delete(
    "/reviews/comments/{comment_id}", response_model=Union[bool, Error]
)
def delete_comment(
    comment_id: int,
    repo: CommentRepository = Depends(),
    dict=Depends(authenticator.get_current_account_data),
):
    return repo.delete_comment(comment_id)


@router.put(
    "/reviews/comments/{comment_id}", response_model=Union[CommentOut, Error]
)
def update(
    comment: CommentIn,
    comment_id: int,
    repo: CommentRepository = Depends(),
    dict=Depends(authenticator.get_current_account_data),
):
    return repo.update_comment(comment_id, comment)
