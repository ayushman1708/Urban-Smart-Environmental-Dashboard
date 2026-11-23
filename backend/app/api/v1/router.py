from fastapi import APIRouter
from app.api.v1.endpoints import auth, dashboard, health, sensors, readings, simulator

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(sensors.router, prefix="/sensors", tags=["Sensors"])
api_router.include_router(readings.router, prefix="/readings", tags=["Readings"])
api_router.include_router(simulator.router, prefix="/simulator", tags=["Simulator"])
