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


class AccountQueries:
    def get_all_accounts(self) -> List[AccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT first_name, last_name, date_of_birth, email, username, password
                    FROM accounts
                    """
                )
                accounts = []
                rows = cur.fetchall()
                for row in rows:
                    account = self.account_record_to_dict(row,cur.description)
                    accounts.append(account)
                return accounts



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




    def account_record_to_dict(self, row, description) -> AccountOut | None:
        account = None
        if row is not None:
            account = {}
            account_fields = [
                "id",
                "first_name",
                "last_name",
                "date_of_birth",
                "email",
                "username",
                "password",
            ]
            for i, column in enumerate(description):
                if column.name in account_fields:
                    account[column.name] = row[i]
