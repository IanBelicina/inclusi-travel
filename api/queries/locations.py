import os
from psycopg_pool import ConnectionPool
from typing import List
from pydantic import BaseModel
from datetime import date
from datetime import date

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class LocationsIn(BaseModel):
    address: str
    city: str
    state: str
    location_name: str
    picture: str
    updated_on: date
class LocationsOut(BaseModel):
    id: int
    address: str
    city: str
    state: str
    location_name: str
    picture: str
    updated_on: date


class LocationQueries:
    def get_all_locations(self)->List[LocationsOut]:
        with pool.connection() as conn:
            with conn.cursur() as cur:
                cur.execute(
                    """
                    SELECT id, address, city, state,
                        location_name, picture
                    FROM locations

                """
                )
                results =[]
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(LocationsOut(**record))

                return results
    def create_location(self, data)->LocationsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                data.updated_on = date.today()
                params =[
                    data.address,
                    data.city,
                    data.state,
                    data.location_name,
                    data.picture,
                    data.updated_on
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
                row= cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name]= row[i]
                return LocationsOut(**record)
