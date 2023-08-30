from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Response,
    Request,
    status,
)
from queries.accounts import (
    AccountQueries,
    AccountIn,
    AccountOut,
    AccountListOut,
    DuplicateAccountError,
)
from typing import Optional
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/api/accounts/{username}", response_model=Optional[AccountOut])
def get_account(
    username: str,
    queries: AccountQueries = Depends(),
):
    record = queries.get_account(username)
    if record is None:
        raise HTTPException(
            status_code=404,
            detail="No account found with id {}".format(username),
        )
    else:
        return record


@router.get("/api/accounts", response_model=AccountListOut)
def get_accounts(queries: AccountQueries = Depends()):
    if queries.get_all_accounts() is None:
        raise HTTPException(status_code=404, detail="No accounts found")
    else:
        return {"accounts": queries.get_all_accounts()}


@router.post(
    "/api/accounts",
    response_model=AccountToken | HttpError,
)
async def create_account(
    data: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    list_accounts = accounts.get_all_accounts()
    if list_accounts is None:
        pass
    else:
        for acc in list_accounts:
            if data.username == acc.username:
                raise HTTPException(
                    status_code=404,
                    detail="Account with this username already exists",
                )

    hashed_password = authenticator.hash_password(data.password)
    try:
        account = accounts.create_account(data, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=data.username, password=data.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())
