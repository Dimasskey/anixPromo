from main import main, templates
from fastapi import Request
from fastapi.responses import HTMLResponse


@main.get("/", status_code=200, tags=["Views"], response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", context={"request": request})


@main.get("/login", status_code=200, tags=["Views"], response_class=HTMLResponse)
async def login(request: Request):
    return templates.TemplateResponse("login.html", context={"request": request})


@main.get("/gifts", status_code=200, tags=["Views"], response_class=HTMLResponse)
async def gifts(request: Request):
    return templates.TemplateResponse("prizesPage.html", context={"request": request})


@main.get("/stage_two", status_code=200, tags=["Views"], response_class=HTMLResponse)
async def stage_two(request: Request):
    return templates.TemplateResponse("gameStageTwo.html", context={"request": request})


@main.get("/suppliers", status_code=200, tags=["Views"], response_class=HTMLResponse)
async def suppliers(request: Request):
    return templates.TemplateResponse("supplierPage.html", context={"request": request})
