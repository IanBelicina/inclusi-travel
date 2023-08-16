from fastapi import APIRouter,Depends
from typing import Optional, Union,List
from queries.comments import CommentIn,CommentOut,Error,CommentRepository

router = APIRouter()
