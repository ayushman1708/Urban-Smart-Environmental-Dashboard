from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.session import get_db
from app.models.reading import SensorReading
from app.models.sensor import Sensor
from app.models.location import Location
from app.models.alert import Alert
from datetime import datetime

router = APIRouter()

class SimulatorTriggerRequest(BaseModel):
    zone_code: str = "Zone B"
    anomaly_type: str = "pollution_spike"  # pollution_spike, sensor_failure, waste_overflow, reset_baseline
    pm25: float = 145.0
    pm10: float = 190.0
    temperature: float = 32.0
    humidity: float = 58.0
    noise_db: float = 78.5
    ph: float = 7.2
    waste_fill_percent: float = 88.0

@router.post("/trigger")
def trigger_simulation_event(req: SimulatorTriggerRequest, db: Session = Depends(get_db)):
    location = db.query(Location).filter(Location.zone_code == req.zone_code).first()
    if not location:
        location = db.query(Location).first()

    sensor = db.query(Sensor).filter(Sensor.location_id == location.id).first()
    if not sensor:
        sensor = db.query(Sensor).first()

    pm25_val = req.pm25
    pm10_val = req.pm10
    aqi_val = int(pm25_val * 1.9 + 10)
    noise_val = req.noise_db
    waste_val = req.waste_fill_percent

    alert_created = None

    if req.anomaly_type == "pollution_spike":
        pm25_val = 178.5
        pm10_val = 220.0
        aqi_val = 215
        new_alert = Alert(
            alert_code=f"ALT-SIM-{int(datetime.utcnow().timestamp())}",
            location_id=location.id,
            sensor_id=sensor.id,
            parameter="PM2.5",
            current_value=178.5,
            threshold_value=75.0,
            severity="CRITICAL",
            message=f"[SIMULATED POLLUTION SPIKE] Critical particulate elevation triggered in {location.name}",
            status="Active",
            timestamp=datetime.utcnow()
        )
        db.add(new_alert)
        alert_created = "CRITICAL PM2.5 Alert Generated"

    elif req.anomaly_type == "sensor_failure":
        if sensor:
            sensor.status = "Offline"
            db.add(sensor)
        new_alert = Alert(
            alert_code=f"ALT-SIM-{int(datetime.utcnow().timestamp())}",
            location_id=location.id,
            sensor_id=sensor.id if sensor else None,
            parameter="Hardware Mesh",
            current_value=0.0,
            threshold_value=1.0,
            severity="HIGH",
            message=f"[SIMULATED SENSOR FAILURE] Node {sensor.device_id if sensor else 'AQ-001'} communication loss detected",
            status="Active",
            timestamp=datetime.utcnow()
        )
        db.add(new_alert)
        alert_created = "HIGH Sensor Communication Loss Alert Generated"

    elif req.anomaly_type == "waste_overflow":
        waste_val = 94.5
        new_alert = Alert(
            alert_code=f"ALT-SIM-{int(datetime.utcnow().timestamp())}",
            location_id=location.id,
            sensor_id=sensor.id if sensor else None,
            parameter="Waste",
            current_value=94.5,
            threshold_value=75.0,
            severity="HIGH",
            message=f"[SIMULATED WASTE OVERFLOW] Container #17 in {location.name} exceeded 90% fill limit",
            status="Active",
            timestamp=datetime.utcnow()
        )
        db.add(new_alert)
        alert_created = "HIGH Waste Fill Capacity Alert Generated"

    elif req.anomaly_type == "reset_baseline":
        pm25_val = 32.0
        pm10_val = 55.0
        aqi_val = 68
        if sensor:
            sensor.status = "Online"
            db.add(sensor)

    # Ingest new reading frame
    new_reading = SensorReading(
        sensor_id=sensor.id if sensor else 1,
        location_id=location.id,
        timestamp=datetime.utcnow(),
        aqi=aqi_val,
        pm25=pm25_val,
        pm10=pm10_val,
        co=1.1,
        no2=24.0,
        o3=16.0,
        temperature=req.temperature,
        humidity=req.humidity,
        noise_db=noise_val,
        ph=req.ph,
        turbidity=2.0,
        dissolved_oxygen=7.8,
        conductivity=450.0,
        tds=220.0,
        waste_fill_percent=waste_val,
        is_simulated=True,
        is_anomaly=(req.anomaly_type != "reset_baseline")
    )
    db.add(new_reading)
    db.commit()

    return {
        "status": "Success",
        "anomaly_type": req.anomaly_type,
        "zone_code": location.zone_code,
        "location_name": location.name,
        "new_reading": {
            "aqi": aqi_val,
            "pm25": pm25_val,
            "pm10": pm10_val,
            "temperature": req.temperature,
            "humidity": req.humidity,
            "noise_db": noise_val,
            "waste_fill_percent": waste_val,
            "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
        },
        "alert_created": alert_created,
        "message": f"Hardware Simulation Event [{req.anomaly_type}] processed and logged to relational database."
    }
