from pydantic import BaseModel
from queries.pool import pool
from typing import List
from queries.locations import LocationsOut # LocationQueries
from queries.accounts import AccountOut

from datetime import date

class ReviewIn(BaseModel):

    location_id: int
    account_id: int
    rating: int
    body: str
    created_on: date

class ReviewOut(BaseModel):
    id: int
    location_id: LocationsOut
    account_id: AccountOut
    rating: int
    body: str
    created_on: date

class ReviewListOut(BaseModel):
    reviews: list[ReviewOut]


class ReviewQueries:
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

                # Initialize an empty dictionary to store the column name-value pairs
                row_dict = {}

                # Loop through the columns and values in the fetched row
                for i, column in enumerate(cur.description):
                    column_name = column.name  # Get the column name
                    column_value = row[i]      # Get the corresponding value from the row
                    row_dict[column_name] = column_value  # Add the column name-value pair to the dictionary

                # Create a ReviewOut object using the dictionary values
                review_out_object = ReviewOut(**row_dict)

                # Return the newly created ReviewOut object
                return review_out_object

    def get_all_reviews(self) -> List[ReviewOut]:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT r.id, r.location_id, r.account_id, r.rating,
                        r.body, r.created_on, l.location_name, l.address, l.city, l.state, l.updated_on, l.picture,
                        a.first_name, a.last_name, a.date_of_birth, a.email, a.username, a.password
                        FROM reviews r
                        JOIN locations l ON r.location_id = l.id
                        JOIN accounts a ON r.account_id = a.id
                        ORDER BY r.created_on;
                        """
                    )

                    results = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        
                       
                        location = LocationsOut(
                            id=record['location_id'],
                            address=record['address'],
                            city=record['city'],
                            state=record['state'],
                            location_name=record['location_name'],
                            updated_on=record['updated_on'],
                            picture=record['picture'] or '', # if it's empty
                        )

                        account = AccountOut(
                            id=record['account_id'],
                            first_name=record['first_name'],
                            last_name=record['last_name'],
                            date_of_birth=record['date_of_birth'],
                            email=record['email'],
                            username=record['username'],
                            password=record['password']
                        )
                        
                        record['location_id'] = location
                        record['account_id'] = account

                        results.append(ReviewOut(**record))

                    return results
                
    def delete_review(self, id) -> None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM reviews
                    WHERE id = %s
                    """,
                    [id],
                )

    def get_review(self, id) -> ReviewOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT r.id, r.location_id, r.account_id, r.rating,
                    r.body, r.created_on, l.location_name, l.address, l.city, l.state, l.updated_on, l.picture,
                    a.first_name, a.last_name, a.date_of_birth, a.email, a.username, a.password
                    FROM reviews r
                    JOIN locations l ON r.location_id = l.id
                    JOIN accounts a ON r.account_id = a.id
                    WHERE r.id = %s;
                    """,
                    (id,),
                )

                row = cur.fetchone()
                if row:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                    location = LocationsOut(
                        id=record['location_id'],
                        address=record['address'],
                        city=record['city'],
                        state=record['state'],
                        location_name=record['location_name'],
                        updated_on=record['updated_on'],
                        picture=record['picture'] or '',  # if it's empty
                    )

                    account = AccountOut(
                        id=record['account_id'],
                        first_name=record['first_name'],
                        last_name=record['last_name'],
                        date_of_birth=record['date_of_birth'],
                        email=record['email'],
                        username=record['username'],
                        password=record['password']
                    )

                    record['location_id'] = location
                    record['account_id'] = account

                    return ReviewOut(**record)
                else:
                    return None