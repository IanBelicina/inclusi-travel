import os
from queries.pool import pool
from pydantic import BaseModel, root_validator
from datetime import date
from typing import List
from fastapi import HTTPException


class DuplicateAccountError(ValueError):
    pass


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

    @root_validator
    def convert_date_of_birth_to_str(cls, values):
        if "date_of_birth" in values and isinstance(
            values["date_of_birth"], date
        ):
            values["date_of_birth"] = values["date_of_birth"].isoformat()
        return values


class AccountOutWithPassword(AccountOut):
    hashed_password: str


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
                if results:
                    return results
                else:
                    return None

    def get_account(self, username) -> AccountOutWithPassword | None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, first_name, last_name, date_of_birth, email, username, password
                    FROM accounts
                    WHERE username = %s
                    """,
                    [username],
                )
                row = cur.fetchone()
                if row is not None:
                    return AccountOutWithPassword(
                        id=row[0],
                        first_name=row[1],
                        last_name=row[2],
                        date_of_birth=row[3],
                        email=row[4],
                        username=row[5],
                        hashed_password=row[6],
                    )
                else:
                    raise HTTPException(
                        status_code=404,
                        detail=f"Account with {username} does not exist",
                    )

    def create_account(
        self, data: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.first_name,
                    data.last_name,
                    data.date_of_birth,
                    data.email,
                    data.username,
                    hashed_password,
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
