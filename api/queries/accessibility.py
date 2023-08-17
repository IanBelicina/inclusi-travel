from pydantic import BaseModel
from datetime import date
from queries.pool import pool




class AccessibilityIn(BaseModel):
    name: str

class AccessibilityOut(BaseModel):
    id: int
    name: str
