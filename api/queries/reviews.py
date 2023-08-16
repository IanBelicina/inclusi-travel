from pydantic import BaseModel
from queries.pool import pool
from typing import List
from queries.locations import LocationsOut
from queries.accounts import AccountOut
from datetime import date

class ReviewOut(BaseModel):
    id: int
    location_id: LocationsOut
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
                        SELECT r.id, r.location_id, r.account_id, r.rating,
                        r.body, r.created_on, l.location_name, l.address, l.city, l.state, l.updated_on, l.picture
                        FROM reviews r
                        JOIN locations l ON r.location_id = l.id
                        ORDER BY r.created_on;
                        """
                    )

                    results = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        
                        # Construct a LocationOut instance
                        location = LocationsOut(
                            id=record['location_id'],
                            address=record['address'],
                            city=record['city'],
                            state=record['state'],
                            location_name=record['location_name'],
                            updated_on=record['updated_on'],
                            picture=record['picture'] or '', # if its empty
                        )

                        # Add the location instance to the ReviewOut object
                        record['location_id'] = location

                        results.append(ReviewOut(**record))

                    return results
                


