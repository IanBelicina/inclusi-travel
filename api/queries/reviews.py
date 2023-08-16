from pydantic import BaseModel
from queries.pool import pool
from typing import List
from queries.locations import LocationsOut
from queries.accounts import AccountOut
from datetime import date

class ReviewOut(BaseModel):
    id: int
    location_id: int
    account_id: int
    rating: int
    body: str
    created_on: date


class ReviewIn(BaseModel):

    location_id: int
    account_id: int
    rating: int
    body: str
    created_on: date

class ReviewListOut(BaseModel):
    reviews: list[ReviewOut]


class ReviewQueries:
    def get_all_reviews(self) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, location_id, account_id, rating,
                        body, created_on
                    FROM reviews
                    ORDER BY created_on
                """
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(ReviewOut(**record))

                return results

    def create_review(self, review: ReviewIn) -> ReviewOut:
        with pool.getconn() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO reviews (location_id, account_id, rating, body, created_on)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, location_id, account_id, rating, body, created_on
                    """,
                     (review.location_id, review.account_id, review.rating, review.body, review.created_on),
                )
                
                row = cur.fetchone()


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


