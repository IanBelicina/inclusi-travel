import os
from psycopg_pool import ConnectionPool
from typing import List
from pydantic import BaseModel
from datetime import date
from typing import Optional
from queries.accessibility import AccessibilityOut

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class LocationsIn(BaseModel):
    address: str
    city: str
    state: str
    location_name: str
    picture: Optional[str]
    updated_on: date


class LocationsOut(BaseModel):
    id: int
    address: str
    city: str
    state: str
    location_name: str
    picture: Optional[str]
    updated_on: date


class LocationListOut(BaseModel):
    locations: list[LocationsOut]


class AccessibilityListOut(BaseModel):
    accessibilities: list[AccessibilityOut]


class Location_AccessibilityOut(BaseModel):
    location: int
    accessibility: list


class Location_AccessibilityIn(BaseModel):
    location: int


class LocationAccessibilityList(BaseModel):
    location: list[Location_AccessibilityOut]


class LocationQueries:
    def get_all_locations(self) -> List[LocationsOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, address, city, state,
                        location_name, picture, updated_on
                    FROM locations

                """
                )
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(LocationsOut(**record))

                return results

    def create_location(self, data) -> LocationsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                data.updated_on = date.today()
                params = [
                    data.address,
                    data.city,
                    data.state,
                    data.location_name,
                    data.picture,
                    data.updated_on,
                ]
                cur.execute(
                    """
                    INSERT INTO locations (address, city, state, location_name, picture, updated_on)
                    VALUES (%s, %s, %s, %s, %s , %s)
                    RETURNING id, address, city, state, location_name, picture, updated_on
                    """,
                    params,
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return LocationsOut(**record)

    def delete_location(self, location_id) -> None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM locations
                    WHERE id = %s
                    """,
                    [location_id],
                )

    def get_a_location(self, location_id) -> LocationsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, address, city, state, location_name, picture, updated_on
                    FROM locations
                    WHERE id = %s
                """,
                    [location_id],
                )
                record = None
                row = cur.fetchone()
                if row is None:
                    return None
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return LocationsOut(**record)

    def update_a_location(self, id, data) -> LocationsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                data.updated_on = date.today()
                params = [
                    data.address,
                    data.city,
                    data.state,
                    data.location_name,
                    data.picture,
                    data.updated_on,
                    id,
                ]
                cur.execute(
                    """
                    UPDATE Locations
                    SET address = %s, city=%s, state =%s, location_name=%s, picture=%s, updated_on=%s
                    WHERE id = %s
                    RETURNING *
                """,
                    params,
                )
                record = None
                row = cur.fetchone()
                if row is None:
                    return None
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return LocationsOut(**record)

    def associate_location_accessibility(
        self, location_id: int, accessibility_id: int
    ) -> None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO location_accessibilities (location_id, acessibility_id)
                    VALUES (%s, %s)
                    ON CONFLICT DO NOTHING
                    """,
                    (location_id, accessibility_id),
                )

    def get_location_accessibilities(
        self, location_id: int
    ) -> List[AccessibilityOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT a.id, a.name
                    FROM accessibilities a
                    JOIN location_accessibilities la ON a.id = la.acessibility_id
                    WHERE la.location_id = %s
                    """,
                    [location_id],
                )
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(AccessibilityOut(**record))

                return results

    def delete_accessibility_from_location(
        self, location_id: int, accessibility_id: int
    ) -> None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM location_accessibilities
                    WHERE location_id = %s and acessibility_id = %s
                    """,
                    (location_id, accessibility_id),
                )
