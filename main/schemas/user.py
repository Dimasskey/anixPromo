from pydantic import BaseModel, field_validator
from fastapi import HTTPException
from main.utils.validation import check_fio, check_phone_number


class UserLogin(BaseModel):
    phone_number: str | int

    @field_validator("phone_number")
    def check_phone_number_(cls, phone_number_):
        phone_number_ = check_phone_number(phone_number_=str(phone_number_))
        if not phone_number_:
            raise HTTPException(
                status_code=400,
                detail={"result": False, "message": "Поле «Телефон» введено некорректно!", "data": {}}
            )
        return phone_number_


class UserSignUp(BaseModel):
    fio: str
    phone_number: str | int

    @field_validator("fio")
    def check_fio_(cls, fio_):
        fio_ = check_fio(fio_=fio_)
        if not fio_ or len(fio_.split()) > 3:
            raise HTTPException(
                status_code=400,
                detail={"result": False, "message": "Поле «ФИО» введено некорректно!", "data": {}}
            )
        return fio_

    @field_validator("phone_number")
    def check_phone_number_(cls, phone_number_):
        phone_number_ = check_phone_number(phone_number_=str(phone_number_))
        if not phone_number_:
            raise HTTPException(
                status_code=400,
                detail={"result": False, "message": "Поле «Телефон» введено некорректно!", "data": {}}
            )
        return phone_number_


class UserRegular(BaseModel):
    id: str
    fio: str | None = None
    phone_number: str | int
    count_steps: int