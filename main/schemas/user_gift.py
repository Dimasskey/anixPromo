from pydantic import BaseModel
from main.schemas.gift import GiftRegular


class UserGiftRegular(BaseModel):
    game_number: int
    gift: GiftRegular | None = None
