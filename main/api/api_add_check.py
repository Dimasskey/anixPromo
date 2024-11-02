from main import main
from fastapi import Request
from main.schemas.response import DefaultResponse
from main.schemas.check import UploadCheck
import redis
from rq import Queue
from main.utils.check import processed_check


@main.post('/api/add_code', status_code=200, tags=["Check"], response_model=DefaultResponse)
def api_add_code(upload_check: UploadCheck):
    # q = Queue(connection=redis.Redis())
    # q.enqueue(processed_check, args=(upload_check.checks, False, None,))

    # return DefaultResponse(
    #     result=False,
    #     message="Конкурс завершился. Спасибо за участие!",
    #     data={}
    # )

    pass


@main.post('/api/add_code_web', status_code=200, tags=["Check"], response_model=DefaultResponse)
async def api_add_code_web(upload_check: UploadCheck, request: Request):
    # await processed_check(upload_check.checks, True, request.headers,)

    # return DefaultResponse(
    #     result=False,
    #     message="Конкурс завершился. Спасибо за участие!",
    #     data={}
    # )

    pass
