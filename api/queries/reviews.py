from pydantic import BaseModel

from queries.locations import LocationsOut
from datetime import date

class ReviewIn(BaseModel):

    location_id: int
    account_id: int
    rating: int
    body: str
    created_on: date



class ReviewOut(BaseModel):
    id: int
    # location_id: LocationsOut
    location_id:int
    account_id: int
    rating: int
    body: str
    created_on: date





#  """
#         CREATE TABLE reviews (
#             id SERIAL NOT NULL UNIQUE,
#             location_id INTEGER NOT NULL REFERENCES locations("id") ON DELETE CASCADE,
#             account_id INTEGER NOT NULL REFERENCES accounts("id") ON DELETE CASCADE,
#              rating INTEGER NOT NULL check(rating = 1 or rating = 2 or rating = 3 or rating = 4 or rating = 5),
#             body TEXT NOT NULL,
#             created_on TIMESTAMP NOT NULL
#         );
#         """,
