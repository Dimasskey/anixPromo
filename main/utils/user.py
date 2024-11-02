from fastapi import HTTPException, Cookie, Response
from main.models.database import engine, Users, Checks
from main.models.CRUD import CRUD
from main.models.session import SessionHandler
from main.schemas.user import UserSignUp, UserRegular, UserLogin
from sqlalchemy import func


async def get_user(
        user_id: str | None = None,
        phone_number: int | None = None,
        with_except: bool = False
) -> Users | None:

    where_ = []
    if user_id is not None:
        where_.append(Users.id == user_id)
    if phone_number is not None:
        where_.append(Users.phone_number == phone_number)

    user: Users = await CRUD(
        session=SessionHandler.create(engine=engine), model=Users
    ).read(
        _where=where_, _all=False
    )

    if user is None:
        if with_except:
            raise HTTPException(
                status_code=409,
                detail={"result": False, "message": "Пользователь не найден!", "data": {}}
            )
        return None
    return user


async def create_new_user(user: UserSignUp) -> Users:
    if await get_user(phone_number=user.phone_number, with_except=False):
        raise HTTPException(
            status_code=409,
            detail={"result": False, "message": "Пользователь с таким номером телефона уже зарегистрирован!", "data": {}}
        )

    await CRUD(
        session=SessionHandler.create(engine=engine), model=Users
    ).create(
        _values=user.model_dump()
    )

    return await get_user(phone_number=user.phone_number, with_except=False)


async def get_signup_user(user: UserSignUp, response: Response) -> str:
    new_user = await create_new_user(user=user)
    response.set_cookie(key="token", value=str(new_user.id), httponly=True, samesite="strict", max_age=7257600)
    return 'Вы успешно зарегистрировались!'


async def get_login_user(user: UserLogin, response: Response) -> str:
    user = await get_user(phone_number=user.phone_number, with_except=False)
    if not user:
        raise HTTPException(
            status_code=409,
            detail={"result": False, "message": "Пользователь с таким номером телефона не найден!", "data": {}}
        )

    response.set_cookie(key="token", value=str(user.id), httponly=True, samesite="strict", max_age=7257600)
    return 'Вы успешно авторизовались!'


async def get_current_user(token=Cookie(default=None)) -> UserRegular:
    if token is None:
        raise HTTPException(
            status_code=401,
            detail={"result": False, "message": "Пожалуйста, авторизуйтесь на сайте!", "data": {}}
        )

    user = await get_user(user_id=token, with_except=False)
    if user:
        return UserRegular(
            id=user.id,
            fio=user.fio,
            phone_number=user.phone_number,
            count_steps=await get_count_steps_user(user_id=user.id)
        )
    else:
        raise HTTPException(
            status_code=401,
            detail={"result": False, "message": "Ваш токен истек, авторизуйтесь на сайте еще раз!", "data": {}}
        )


async def add_user_fio(fio: str, token: str) -> str:
    user = await get_user(user_id=token, with_except=False)
    if user.fio is not None:
        raise HTTPException(
            status_code=409,
            detail={"result": False, "message": "Вы уже указали свое полное ФИО!", "data": {}}
        )

    from main.utils.validation import check_fio
    fio_ = check_fio(fio_=fio)
    if not fio_ or len(fio_.split()) > 3:
        raise HTTPException(
            status_code=400,
            detail={"result": False, "message": "Поле «ФИО» введено некорректно!", "data": {}}
        )

    await CRUD(
        session=SessionHandler.create(engine=engine), model=Users
    ).update(
        _where=[Users.id == token], _values=dict(fio=fio_)
    )

    return 'Вы успешно добавили свое ФИО!'


async def get_count_steps_user(user_id: str) -> int:
    count_steps = await CRUD(
        session=SessionHandler.create(engine=engine), model=Checks
    ).extended_query(
        _select=[func.sum(Checks.amount).label('sum')],
        _join=[],
        _where=[Checks.user_id == user_id],
        _group_by=[Checks.user_id],
        _order_by=[],
        _all=False
    )

    if count_steps is None:
        return 0
    return count_steps.sum // 500
