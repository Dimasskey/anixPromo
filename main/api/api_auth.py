from main import main
from fastapi import Depends, Response
from main.schemas.response import DefaultResponse
from main.schemas.user import UserSignUp, UserDefault
from main.utils.user import get_signup_user, get_login_user, get_current_user, add_user_fio


@main.post('/api/signup', status_code=200, tags=["Auth"], response_model=DefaultResponse)
async def api_signup_user(user: UserSignUp, response: Response):
    signup_user = await get_signup_user(user=user, response=response)
    return DefaultResponse(message=signup_user['message'], data=signup_user['data'])


@main.post('/api/login', status_code=200, tags=["Auth"], response_model=DefaultResponse)
async def api_login_user(login_user=Depends(get_login_user)):
    return DefaultResponse(message=login_user['message'], data=login_user['data'])


@main.get('/api/users/me', status_code=200, tags=["Auth"], response_model=UserDefault)
async def api_get_current_user(token: str | None = None):
    # user=Depends(get_current_user)
    return UserDefault(data=await get_current_user(token=token))


@main.post('/api/users/me/fio', status_code=200, tags=["Auth"], response_model=DefaultResponse)
async def api_add_user_fio(fio: str, user=Depends(get_current_user)):
    return DefaultResponse(message=await add_user_fio(fio=fio, token=user.token))
