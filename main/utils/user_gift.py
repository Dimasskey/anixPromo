from main.models.database import engine, UsersGifts, Gifts
from main.models.CRUD import CRUD
from main.models.session import SessionHandler
from main.schemas.user_gift import UserGiftRegular
from main.schemas.gift import GiftRegular
from main.schemas.user import UserRegular
from main.utils.gift import get_gift


async def get_user_gift(user_id: str) -> tuple[UserGiftRegular] | tuple:
    users_gifts = await CRUD(
        session=SessionHandler.create(engine=engine), model=UsersGifts
    ).extended_query(
        _select=[
            UsersGifts.game_number,
            Gifts.id.label('gift_id'),
            Gifts.name.label('gift_name'),
            Gifts.about.label('gift_about'),
            Gifts.attachment_id.label('gift_attachment_id')
        ],
        _join=[
            [Gifts, Gifts.id == UsersGifts.gift_id]
        ],
        _where=[
            UsersGifts.user_id == user_id
        ],
        _group_by=[],
        _order_by=[UsersGifts.game_number],
        _all=True
    )

    if users_gifts is None:
        return tuple()

    results = []
    for x in users_gifts:
        results.append(
            UserGiftRegular(
                game_number=x.game_number,
                gift=GiftRegular(
                    id=x.gift_id,
                    name=x.gift_name,
                    about=x.gift_about,
                    attachment_id=x.gift_attachment_id
                ) if x.gift_id else None
            )
        )

    return tuple(results)


async def create_user_gift(user_id: str) -> None:
    for game_number in range(1, 5):
        await CRUD(
            session=SessionHandler.create(engine=engine), model=UsersGifts
        ).create(
            _values=dict(
                user_id=user_id,
                game_number=game_number
            )
        )


async def update_user_gift(game_number: int, user: UserRegular) -> str:
    import random
    random_gift = random.choice(await get_gift())

    await CRUD(
        session=SessionHandler.create(engine=engine), model=UsersGifts
    ).update(
        _where=[
            UsersGifts.user_id == user.token,
            UsersGifts.game_number == game_number
        ],
        _values=dict(gift_id=random_gift.id)
    )

    return "Успешно добавлен пользовательский подарок!"
