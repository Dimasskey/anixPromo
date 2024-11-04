from pydantic import BaseModel
from sqlalchemy import UUID


class SupplierRegular(BaseModel):
    id: int
    name: str
    about: str
    attachment_id: str | UUID | None = None

    class Config:
        arbitrary_types_allowed = True