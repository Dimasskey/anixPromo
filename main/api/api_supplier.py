from main import main
from main.schemas.response import DefaultResponse


@main.get('/api/suppliers/{supplier_id}', status_code=200, tags=["Suppliers"], response_model=DefaultResponse)
async def api_get_supplier(supplier_id: int):
    from main.utils.supplier import get_supplier
    return DefaultResponse(data=await get_supplier(supplier_id=supplier_id, with_except=False))
