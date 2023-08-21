from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from queries.accounts import AccountQueries, AccountIn, AccountOut, DuplicateAccountError, AccountListOut
from typing import Optional
from psycopg.errors import ForeignKeyViolation
from authenticator import authenticator
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel



class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str


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


# @router.get("/api/accounts", response_model = AccountListOut)
# def get_accounts(
#     queries: AccountQueries = Depends()
# ):

#     return {"accounts": queries.get_all_accounts()}

@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    queries: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    print("hashed_password", hashed_password)
    try:
        account = queries.create_account(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    print("This is form", form)
    token = await authenticator.login(response, request, form, queries)
    return AccountToken(account=account, **token.dict())
