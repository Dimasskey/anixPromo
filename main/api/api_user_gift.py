from main import main
from fastapi import Depends
from main.schemas.response import DefaultResponse
from main.utils.user import get_current_user


@main.post('/api/users_gifts', status_code=200, tags=["UsersGifts"], response_model=DefaultResponse)
async def api_add_user_gift(game_number: int, user=Depends(get_current_user)):
    from main.utils.user_gift import add_user_gift
    return DefaultResponse(message=await add_user_gift(game_number=game_number, user=user))
