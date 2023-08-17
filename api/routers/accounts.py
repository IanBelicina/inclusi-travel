from fastapi import APIRouter, Depends, HTTPException
from queries.accounts import AccountQueries, AccountIn, AccountOut
from typing import Optional
from psycopg.errors import ForeignKeyViolation

router = APIRouter()

@router.post("/api/accounts", response_model=AccountOut)
def create_account(
    account: AccountIn,
    queries: AccountQueries = Depends(),
):
    try:
        return queries.create_account(account)
    except ForeignKeyViolation as e:
        raise HTTPException(status_code = 400, detail = "Failed to create account due to foreign key violation")


@router.get("/api/accounts/{account_id}", response_model = Optional[AccountOut])
def get_account(
    account_id: int,
    queries: AccountQueries = Depends(),
    ):
    record = queries.get_account(account_id)
    if record is None:
        raise HTTPException(status_code = 404, detail = "No account found with id {}".format(account_id))
    else:
        return record
