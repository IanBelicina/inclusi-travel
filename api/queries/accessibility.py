import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List
from fastapi import HTTPException


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
                    SELECT id, name
                    FROM accessibilities
                    WHERE name = %s
                    """,
                    params,
                )
                if cur.rowcount > 0:
                    raise HTTPException(status_code=400, detail="The acessibility already exists")
                else:
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
                if record is not None:
                    return AccessibilityOut(**record)
                else:
                    raise HTTPException(status_code = 404, detail="Unable to create the accessibility")

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
