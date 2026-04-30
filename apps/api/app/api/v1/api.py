from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, clusters, namespaces, workloads, deployments, policies, dashboard, metrics
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(clusters.router, prefix="/clusters", tags=["clusters"])
api_router.include_router(namespaces.router, prefix="/namespaces", tags=["namespaces"])
api_router.include_router(workloads.router, prefix="/workloads", tags=["workloads"])
api_router.include_router(deployments.router, prefix="/deployments", tags=["deployments"])
api_router.include_router(policies.router, prefix="/policies", tags=["policies"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
