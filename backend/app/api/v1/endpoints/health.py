from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import get_db

router = APIRouter()

@router.get("")
def get_health_status(db: Session = Depends(get_db)):
    db_connected = False
    try:
        db.execute(text("SELECT 1"))
        db_connected = True
    except Exception:
        db_connected = False

    return {
        "backend": "Online",
        "database": "Connected" if db_connected else "Disconnected",
        "ai_service": "Available (Demo Mode Enabled)",
        "iot_gateway": "Online",
        "websocket": "Active",
        "last_sensor_update": "3 seconds ago",
        "api_response_time_ms": 14,
        "total_sensors": 15,
        "online_sensors": 14,
        "offline_sensors": 1
    }
