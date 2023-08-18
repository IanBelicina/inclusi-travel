import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


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

class AccountListOut(BaseModel):
    accounts: List[AccountOut]


class AccountQueries:
    def get_all_accounts(self) -> List[AccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, first_name, last_name, date_of_birth, email, username
                    FROM accounts
                    """
                )
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(AccountOut(**record))

                return results



    def get_account(self, account_id) -> AccountOut | None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, first_name, last_name, date_of_birth, email, username
                    FROM accounts
                    WHERE id = %s
                    """,
                    [account_id],
                )
                row = cur.fetchone()
                if row is not None:
                    return AccountOut(
                        id = row[0],
                        first_name = row[1],
                        last_name=row[2],
                        date_of_birth = row[3],
                        email = row[4],
                        username = row[5],
                    )
                else:
                    return None


    def create_account(self, data) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.first_name,
                    data.last_name,
                    data.date_of_birth,
                    data.email,
                    data.username,
                    data.password,
                ]
                cur.execute(
                    """
                    INSERT INTO accounts(first_name, last_name, date_of_birth, email, username, password)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id, first_name, last_name, date_of_birth, email, username, password
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return AccountOut(**record)
