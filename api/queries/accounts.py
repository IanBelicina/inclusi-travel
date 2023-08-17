from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List


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
    password: str

class AccountListOut(BaseModel):
    accounts: List[AccountOut]


class AccountQueries:
    def get_all_accounts(self) -> List[AccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, first_name, last_name, date_of_birth, email, username, password
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
                    SELECT id, first_name, last_name, date_of_birth, email, username, password
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
                        password = row[6],
                    )
                else:
                    return None

    # def create_account(self,account) -> AccountOut | None:
    #     id = None
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             cur.execute(

    #             )
