from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional
from queries.locations import LocationsOut, LocationQueries
from queries.accounts import AccountOut, AccountQueries

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


                row_dict = {}


                for i, column in enumerate(cur.description):
                    column_name = column.name
                    column_value = row[i]
                    row_dict[column_name] = column_value

                location_id = row_dict['location_id']
                account_id = row_dict['account_id']

                location_instance = LocationQueries().get_a_location(location_id)
                account_instance = AccountQueries().get_account(account_id)


                row_dict['location_id'] = location_instance
                row_dict['account_id'] = account_instance


                review_out_object = ReviewOut(**row_dict)


                return review_out_object



    def get_all_reviews(self) -> List[ReviewOut]:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT r.id, r.location_id, r.account_id, r.rating,
                        r.body, r.created_on, l.location_name, l.address, l.city, l.state, l.updated_on, l.picture,
                        a.first_name, a.last_name, a.date_of_birth, a.email, a.username
                        FROM reviews r
                        JOIN locations l ON r.location_id = l.id
                        JOIN accounts a ON r.account_id = a.username
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
                            # password=record['password']
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
                    a.first_name, a.last_name, a.date_of_birth, a.email, a.username
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
                        # password=record['password']
                    )

                    record['location_id'] = location
                    record['account_id'] = account

                    return ReviewOut(**record)
                else:
                    return None

    def update_review(self, id: int, updated_review: ReviewIn) -> Optional[ReviewOut]:
        with pool.getconn() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE reviews
                    SET location_id = %s, account_id = %s, rating = %s, body = %s
                    WHERE id = %s
                    RETURNING id, location_id, account_id, rating, body, created_on
                    """,
                    (updated_review.location_id, updated_review.account_id, updated_review.rating, updated_review.body, id),
                )

                row = cur.fetchone()

                if row:
                    row_dict = {}
                    for i, column in enumerate(cur.description):
                        column_name = column.name
                        column_value = row[i]
                        row_dict[column_name] = column_value

                    location_id = row_dict['location_id']
                    account_id = row_dict['account_id']

                    location_instance = LocationQueries().get_a_location(location_id)
                    account_instance = AccountQueries().get_account(account_id)

                    row_dict['location_id'] = location_instance
                    row_dict['account_id'] = account_instance

                    review_out_object = ReviewOut(**row_dict)

                    return review_out_object
                else:
                    return None

    def get_average_rating_for_location(self, location_id: int) -> float:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT AVG(rating)
                    FROM reviews
                    WHERE location_id = %s
                    """,
                    [location_id],
                )
                average_rating = cur.fetchone()[0]
                return average_rating if average_rating is not None else 0.0
