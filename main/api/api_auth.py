from main import main
from fastapi import Depends, Response
from main.schemas.response import DefaultResponse
from main.schemas.user import UserSignUp, UserDefault
from main.utils.user import get_signup_user, get_login_user, get_current_user, add_user_fio


@main.post('/api/signup', status_code=200, tags=["Auth"], response_model=DefaultResponse)
async def api_signup_user(user: UserSignUp, response: Response):
    return DefaultResponse(message=await get_signup_user(user=user, response=response))


@main.post('/api/login', status_code=200, tags=["Auth"], response_model=DefaultResponse)
async def api_login_user(user=Depends(get_login_user)):
    return DefaultResponse(message=user)


@main.get('/api/users/me', status_code=200, tags=["Auth"], response_model=UserDefault)
async def api_get_current_user(user=Depends(get_current_user)):
    return UserDefault(data=user)


@main.post('/api/users/me/fio', status_code=200, tags=["Auth"], response_model=DefaultResponse)
async def api_add_user_fio(fio: str, user=Depends(get_current_user)):
    return DefaultResponse(message=await add_user_fio(fio=fio, token=user.token))
