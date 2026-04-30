from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_workloads():
    return {'status': 'ok', 'component': 'workloads'}
