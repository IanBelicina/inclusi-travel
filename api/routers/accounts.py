from fastapi import APIRouter, Depends, HTTPException
from queries.accounts import AccountQueries, AccountIn, AccountOut, AccountListOut
from typing import Optional
from psycopg.errors import ForeignKeyViolation

router = APIRouter()



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


@router.get("/api/accounts", response_model = AccountListOut)
def get_accounts(
    queries: AccountQueries = Depends()
):

    return {"accounts": queries.get_all_accounts()}


@router.post("/api/accounts", response_model=AccountOut)
def create_account(
    account: AccountIn,
    queries: AccountQueries = Depends(),
):
    try:
        return queries.create_account(account)
    except ForeignKeyViolation as e:
        raise HTTPException(status_code = 400)
