from main import main, templates
from fastapi import Request
from fastapi.responses import HTMLResponse


@main.get("/", status_code=200, tags=["Views"], response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", context={"request": request})
