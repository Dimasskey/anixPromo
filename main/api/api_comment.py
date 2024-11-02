from main import main
from fastapi import Depends
from main.schemas.response import DefaultResponse
from main.schemas.comment import CommentAdd
from main.utils.user import get_current_user


@main.get('/api/comments', status_code=200, tags=["Comments"], response_model=DefaultResponse)
async def api_get_comments(suppliers_id: int):
    from main.utils.comment import get_comments
    return DefaultResponse(data=await get_comments(suppliers_id=suppliers_id))


@main.post('/api/comments', status_code=200, tags=["Comments"], response_model=DefaultResponse)
async def api_add_comment(comment: CommentAdd, user=Depends(get_current_user)):
    from main.utils.comment import add_comment
    return DefaultResponse(data=await add_comment(comment=comment, user=user))
