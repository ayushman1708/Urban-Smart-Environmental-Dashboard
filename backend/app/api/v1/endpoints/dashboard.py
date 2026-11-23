from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from app.db.session import get_db
from app.models.reading import SensorReading
from app.models.sensor import Sensor
from app.models.location import Location
from app.models.alert import Alert
from app.schemas.dashboard import OverviewSummaryResponse, KPIMetric, RecentAlertItem, EnvironmentalStatusItem
from datetime import datetime

router = APIRouter()

@router.get("/summary", response_model=OverviewSummaryResponse)
def get_dashboard_summary(db: Session = Depends(get_db)):
    latest_reading = db.query(SensorReading).order_by(desc(SensorReading.timestamp)).first()
    
    total_sensors = db.query(Sensor).count()
    online_sensors = db.query(Sensor).filter(Sensor.status == "Online").count()
    active_alerts = db.query(Alert).filter(Alert.status == "Active").count()

    aqi_val = latest_reading.aqi if latest_reading and latest_reading.aqi else 82
    pm25_val = latest_reading.pm25 if latest_reading and latest_reading.pm25 else 42.0
    pm10_val = latest_reading.pm10 if latest_reading and latest_reading.pm10 else 76.0
    temp_val = latest_reading.temperature if latest_reading and latest_reading.temperature else 29.0
    hum_val = latest_reading.humidity if latest_reading and latest_reading.humidity else 62.0

    def get_aqi_status(val):
        if val <= 50: return "Good"
        if val <= 100: return "Moderate"
        if val <= 150: return "Unhealthy for Sensitive Groups"
        if val <= 200: return "Poor"
        return "Critical"

    return {
        "current_aqi": {
            "title": "Current AQI",
            "value": str(int(aqi_val)),
            "raw_value": float(aqi_val),
            "unit": "AQI",
            "status": get_aqi_status(aqi_val),
            "trend": "up" if aqi_val > 80 else "down",
            "change_percentage": 4.2,
            "last_updated": "Just now"
        },
        "pm25": {
            "title": "PM2.5",
            "value": f"{pm25_val:.1f}",
            "raw_value": float(pm25_val),
            "unit": "μg/m³",
            "status": "Moderate" if pm25_val < 50 else "High",
            "trend": "up",
            "change_percentage": 3.8,
            "last_updated": "Just now"
        },
        "pm10": {
            "title": "PM10",
            "value": f"{pm10_val:.1f}",
            "raw_value": float(pm10_val),
            "unit": "μg/m³",
            "status": "Moderate",
            "trend": "down",
            "change_percentage": -1.5,
            "last_updated": "Just now"
        },
        "temperature": {
            "title": "Temperature",
            "value": f"{temp_val:.1f}",
            "raw_value": float(temp_val),
            "unit": "°C",
            "status": "Optimal",
            "trend": "stable",
            "change_percentage": 0.5,
            "last_updated": "Just now"
        },
        "humidity": {
            "title": "Humidity",
            "value": f"{hum_val:.1f}",
            "raw_value": float(hum_val),
            "unit": "%",
            "status": "Optimal",
            "trend": "down",
            "change_percentage": -2.1,
            "last_updated": "Just now"
        },
        "active_alerts_count": active_alerts,
        "system_status": "Healthy",
        "total_sensors": total_sensors,
        "online_sensors": online_sensors
    }

@router.get("/recent-alerts", response_model=list[RecentAlertItem])
def get_recent_alerts(db: Session = Depends(get_db)):
    alerts = db.query(Alert).order_by(desc(Alert.timestamp)).limit(5).all()
    results = []
    for a in alerts:
        loc = db.query(Location).filter(Location.id == a.location_id).first()
        results.append({
            "id": a.id,
            "alert_code": a.alert_code,
            "zone_name": loc.name if loc else "Unknown Zone",
            "parameter": a.parameter,
            "current_value": a.current_value,
            "threshold_value": a.threshold_value,
            "severity": a.severity,
            "message": a.message,
            "timestamp": a.timestamp.strftime("%H:%M:%S") if a.timestamp else "N/A"
        })
    return results

@router.get("/environmental-status", response_model=list[EnvironmentalStatusItem])
def get_environmental_status():
    return [
        {
            "category": "Air Quality",
            "status": "Moderate",
            "health_indicator": "yellow",
            "latest_reading": "AQI 82 (PM2.5: 42.0 μg/m³)",
            "trend_description": "Elevated PM2.5 in Industrial Zone B during evening hours"
        },
        {
            "category": "Weather",
            "status": "Good",
            "health_indicator": "green",
            "latest_reading": "29°C | 62% Humidity | 8.4 km/h Wind",
            "trend_description": "Stable conditions, low wind speed accumulating surface air particles"
        },
        {
            "category": "Water Quality",
            "status": "Good",
            "health_indicator": "green",
            "latest_reading": "pH 7.3 | Turbidity 2.1 NTU | DO 7.8 mg/L",
            "trend_description": "Water quality baseline optimal across all river basin sensors"
        },
        {
            "category": "Noise",
            "status": "Moderate",
            "health_indicator": "yellow",
            "latest_reading": "68 dB Avg (Peak: 78 dB)",
            "trend_description": "Traffic corridor Zone E registering minor decibel threshold exceedances"
        },
        {
            "category": "Smart Waste",
            "status": "Attention",
            "health_indicator": "orange",
            "latest_reading": "81% Fill Level (Bin #17)",
            "trend_description": "Collection dispatch recommended for Zone B within 2 hours"
        }
    ]
