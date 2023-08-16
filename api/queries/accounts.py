from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool




class AccountIn(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    email: str
    username: str
    password: str

class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    date_of_birth: date
    email: str
    username: str
    password: str
