from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message:str


class CommentIn(BaseModel):
    account_id: int
    review_id: int
    content: str
    created_on: date

class CommentOut(BaseModel):
    id: int
    account_id: int
    review_id: int
    content: str
    created_on: date
