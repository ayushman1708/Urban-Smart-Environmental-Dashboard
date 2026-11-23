from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.sensor import Sensor
from app.models.location import Location

router = APIRouter()

@router.get("")
def list_sensors(db: Session = Depends(get_db)):
    sensors = db.query(Sensor).all()
    results = []
    for s in sensors:
        loc = db.query(Location).filter(Location.id == s.location_id).first()
        results.append({
            "id": s.id,
            "device_id": s.device_id,
            "sensor_type": s.sensor_type,
            "location_name": loc.name if loc else "Unknown",
            "zone_code": loc.zone_code if loc else "N/A",
            "status": s.status,
            "battery_level": s.battery_level,
            "signal_strength": s.signal_strength,
            "firmware_version": s.firmware_version,
            "comm_protocol": s.comm_protocol,
            "last_communication": s.last_communication.strftime("%Y-%m-%d %H:%M:%S") if s.last_communication else "N/A"
        })
    return results
