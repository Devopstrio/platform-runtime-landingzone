from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_clusters():
    return {'status': 'ok', 'component': 'clusters'}
