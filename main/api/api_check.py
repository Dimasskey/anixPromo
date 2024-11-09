import redis
from rq import Queue
from main import main
from fastapi import Request
from main.schemas.check import UploadCheck
from main.schemas.response import DefaultResponse
from main.utils.check import processed_check


@main.post('/api/add_code', status_code=200, tags=["Checks"], response_model=DefaultResponse)
def api_add_code(upload_check: UploadCheck):
    q = Queue(connection=redis.Redis())
    q.enqueue(processed_check, args=(upload_check.checks, False, None,))
    return DefaultResponse()


@main.post('/api/add_code_web', status_code=200, tags=["Checks"], response_model=DefaultResponse)
async def api_add_code_web(upload_check: UploadCheck, request: Request):
    await processed_check(checks=upload_check.checks, web=True, header=request.headers)
    return DefaultResponse()
