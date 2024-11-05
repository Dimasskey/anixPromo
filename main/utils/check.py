from main.models.database import engine, Checks, Users
from main.models.CRUD import CRUD
from main.models.session import SessionHandler
from fastapi import HTTPException
from main.schemas.check import Check
from uuid import uuid4


async def processed_check(checks: [Check], web: bool = False, header=None):
    from main.utils.validation import check_code_check, check_phone_number
    from main.utils.user import get_user

    for i in checks:
        code_check: tuple | bool = check_code_check(i.code)
        if not code_check and web:
            raise HTTPException(
                status_code=400,
                detail={"result": False, "message": "Код указан не корректно!", "data": {}}
            )

        id_cassir, fio_cassir = i.scode, i.sname

        if web:
            try:
                p = header.get('user-agent')
                p = p[:255] if len(p) > 255 else p
            except Exception as e:
                p = 'ERROR'
                print(f"ERROR: Нашёлся хитрец\n{e}")
        else:
            p = 'pos'

        phone: int | bool = check_phone_number(i.phone)

        if phone is False and web:
            raise HTTPException(
                status_code=400,
                detail={"result": False, "message": "Номер телефона указан не корректно!", "data": {}}
            )

        amount: float = float(code_check[0])
        code_shop = (int(code_check[1].split('-')[0]) - 100000) // 100

        find_check = await CRUD(
            session=SessionHandler.create(engine=engine), model=Checks
        ).read(
            _where=[Checks.code_check == code_check[1]], _all=False
        )

        find_check = find_check[0] if find_check else None

        if phone is False and find_check is None:
            await CRUD(
                session=SessionHandler.create(engine=engine), model=Checks
            ).create(
                _values=dict(
                    raw_code_check=code_check[2],
                    code_check=code_check[1],
                    amount=amount,
                    platform=p,
                    user_id=None,
                    code_shop=code_shop,
                    id_cassir=id_cassir,
                    fio_cassir=fio_cassir,
                    is_verified=True
                )
            )

            if web:
                raise HTTPException(
                    status_code=200,
                    detail={"result": True, "message": "Вы успешно зарегистрировали код!", "data": {}}
                )

        elif phone is not False and find_check is None:
            find_user = await get_user(phone_number=phone, with_except=False)

            if find_user is None:
                new_token = str(uuid4())
                await CRUD(
                    session=SessionHandler.create(engine=engine), model=Users
                ).create(
                    _values=dict(
                        id=new_token,
                        fio=None,
                        phone_number=phone
                    )
                )

                await CRUD(
                    session=SessionHandler.create(engine=engine), model=Checks
                ).create(
                    _values=dict(
                        raw_code_check=code_check[2],
                        code_check=code_check[1],
                        amount=amount,
                        platform=p,
                        user_id=new_token,
                        code_shop=code_shop,
                        id_cassir=id_cassir,
                        fio_cassir=fio_cassir,
                        is_verified=True
                    )
                )

                if web:
                    raise HTTPException(
                        status_code=200,
                        detail={"result": True, "message": "Вы успешно зарегистрировали код!", "data": {}}
                    )
            else:
                await CRUD(
                    session=SessionHandler.create(engine=engine), model=Checks
                ).create(
                    _values=dict(
                        raw_code_check=code_check[2],
                        code_check=code_check[1],
                        amount=amount,
                        platform=p,
                        user_id=find_user.id,
                        code_shop=code_shop,
                        id_cassir=id_cassir,
                        fio_cassir=fio_cassir,
                        is_verified=True
                    )
                )

                if web:
                    raise HTTPException(
                        status_code=200,
                        detail={"result": True, "message": "Вы успешно зарегистрировали код!", "data": {}}
                    )

        elif phone is not False and find_check is not None:
            find_user = await get_user(phone_number=phone, with_except=False)

            if find_check.user_id is None:
                if find_user is None:
                    new_token = str(uuid4())
                    await CRUD(
                        session=SessionHandler.create(engine=engine), model=Users
                    ).create(
                        _values=dict(
                            id=new_token,
                            fio=None,
                            phone_number=phone
                        )
                    )

                    await CRUD(
                        session=SessionHandler.create(engine=engine), model=Checks
                    ).update(
                        _where=[Checks.code_check == code_check[1]],
                        _values=dict(user_id=new_token)
                    )

                    if find_check.id_cassir is None and id_cassir is not None:
                        await CRUD(
                            session=SessionHandler.create(engine=engine), model=Checks
                        ).update(
                            _where=[Checks.code_check == code_check[1]],
                            _values=dict(id_cassir=id_cassir)
                        )

                    if find_check.fio_cassir is None and fio_cassir is not None:
                        await CRUD(
                            session=SessionHandler.create(engine=engine), model=Checks
                        ).update(
                            _where=[Checks.code_check == code_check[1]],
                            _values=dict(fio_cassir=fio_cassir)
                        )

                    if web:
                        raise HTTPException(
                            status_code=200,
                            detail={"result": True, "message": "Вы успешно зарегистрировали код!", "data": {}}
                        )

                else:
                    await CRUD(
                        session=SessionHandler.create(engine=engine), model=Checks
                    ).update(
                        _where=[Checks.code_check == code_check[1]],
                        _values=dict(user_id=find_user.id)
                    )

                    if find_check.id_cassir is None and id_cassir is not None:
                        await CRUD(
                            session=SessionHandler.create(engine=engine), model=Checks
                        ).update(
                            _where=[Checks.code_check == code_check[1]],
                            _values=dict(id_cassir=id_cassir)
                        )

                    if find_check.fio_cassir is None and fio_cassir is not None:
                        await CRUD(
                            session=SessionHandler.create(engine=engine), model=Checks
                        ).update(
                            _where=[Checks.code_check == code_check[1]],
                            _values=dict(fio_cassir=fio_cassir)
                        )

                    if web:
                        raise HTTPException(
                            status_code=200,
                            detail={"result": True, "message": "Вы успешно зарегистрировали код!", "data": {}}
                        )

            else:
                if find_check.id_cassir is None and id_cassir is not None:
                    await CRUD(
                        session=SessionHandler.create(engine=engine), model=Checks
                    ).update(
                        _where=[Checks.code_check == code_check[1]],
                        _values=dict(id_cassir=id_cassir)
                    )

                if find_check.fio_cassir is None and fio_cassir is not None:
                    await CRUD(
                        session=SessionHandler.create(engine=engine), model=Checks
                    ).update(
                        _where=[Checks.code_check == code_check[1]],
                        _values=dict(fio_cassir=fio_cassir)
                    )

                if web:
                    raise HTTPException(
                        status_code=400,
                        detail={"result": True, "message": "Данный чек уже зарегистрирован!", "data": {}}
                    )

        elif phone is False and find_check is not None:
            if find_check.id_cassir is None and id_cassir is not None:
                await CRUD(
                    session=SessionHandler.create(engine=engine), model=Checks
                ).update(
                    _where=[Checks.code_check == code_check[1]],
                    _values=dict(id_cassir=id_cassir)
                )

            if find_check.fio_cassir is None and fio_cassir is not None:
                await CRUD(
                    session=SessionHandler.create(engine=engine), model=Checks
                ).update(
                    _where=[Checks.code_check == code_check[1]],
                    _values=dict(fio_cassir=fio_cassir)
                )

            if web:
                raise HTTPException(
                    status_code=200,
                    detail={"result": True, "message": "Вы успешно зарегистрировали код!", "data": {}}
                )

        else:
            print("Это конец или что?")
