import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class AccessibilityIn(BaseModel):
    name: str

class AccessibilityOut(BaseModel):
    id: int
    name: str

class AccessibilityListOut(BaseModel):
    accessibilities: list[AccessibilityOut]

class AcessibilityQueries:
    def create_accessibility(self, data) -> AccessibilityOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.name
                ]
                cur.execute(
                    """
                    INSERT INTO accessibilities (name)
                    VALUES (%s)
                    RETURNING id, name
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return AccessibilityOut(**record)

    def get_all_accessibilities(self) -> List[AccessibilityOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, name
                    FROM accessibilities
                """
                )
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(AccessibilityOut(**record))

                return results
