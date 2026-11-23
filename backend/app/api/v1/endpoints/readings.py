from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from app.db.session import get_db
from app.models.reading import SensorReading
from app.models.location import Location
from app.models.sensor import Sensor
from datetime import datetime, timedelta
from typing import Optional, List

router = APIRouter()

@router.get("/air-quality")
def get_air_quality_telemetry(db: Session = Depends(get_db)):
    latest = db.query(SensorReading).order_by(desc(SensorReading.timestamp)).first()
    
    # 24-hour hourly trend for Air Quality
    start_time = datetime.utcnow() - timedelta(hours=24)
    readings = db.query(SensorReading).filter(SensorReading.timestamp >= start_time).order_by(SensorReading.timestamp).all()
    
    trend = []
    # Aggregate by hour
    hourly_map = {}
    for r in readings:
        h_str = r.timestamp.strftime("%H:00")
        if h_str not in hourly_map:
            hourly_map[h_str] = {"aqi": [], "pm25": [], "pm10": []}
        if r.aqi: hourly_map[h_str]["aqi"].append(r.aqi)
        if r.pm25: hourly_map[h_str]["pm25"].append(r.pm25)
        if r.pm10: hourly_map[h_str]["pm10"].append(r.pm10)

    for h_str, data in list(hourly_map.items())[-8:]:
        trend.append({
            "time": h_str,
            "AQI": int(sum(data["aqi"])/len(data["aqi"])) if data["aqi"] else 80,
            "PM25": round(sum(data["pm25"])/len(data["pm25"]), 1) if data["pm25"] else 40.0,
            "PM10": round(sum(data["pm10"])/len(data["pm10"]), 1) if data["pm10"] else 75.0,
        })

    # Zone breakdown
    zones = db.query(Location).all()
    zone_pollution = []
    for z in zones:
        z_latest = db.query(SensorReading).filter(SensorReading.location_id == z.id).order_by(desc(SensorReading.timestamp)).first()
        zone_pollution.append({
            "zone_code": z.zone_code,
            "zone_name": z.name,
            "aqi": z_latest.aqi if z_latest and z_latest.aqi else 75,
            "pm25": z_latest.pm25 if z_latest and z_latest.pm25 else 35.0,
            "pm10": z_latest.pm10 if z_latest and z_latest.pm10 else 65.0,
            "status": "Poor" if (z_latest and z_latest.aqi and z_latest.aqi > 150) else ("Moderate" if (z_latest and z_latest.aqi and z_latest.aqi > 100) else "Good")
        })

    return {
        "current_aqi": latest.aqi if latest and latest.aqi else 82,
        "pm25": latest.pm25 if latest and latest.pm25 else 42.0,
        "pm10": latest.pm10 if latest and latest.pm10 else 76.0,
        "co": latest.co if latest and latest.co else 1.2,
        "no2": latest.no2 if latest and latest.no2 else 28.5,
        "o3": latest.o3 if latest and latest.o3 else 18.2,
        "trend": trend,
        "zone_pollution": zone_pollution
    }

@router.get("/weather")
def get_weather_telemetry(db: Session = Depends(get_db)):
    latest = db.query(SensorReading).order_by(desc(SensorReading.timestamp)).first()
    
    # Weather trend
    start_time = datetime.utcnow() - timedelta(hours=24)
    readings = db.query(SensorReading).filter(SensorReading.timestamp >= start_time).order_by(SensorReading.timestamp).all()
    
    hourly_map = {}
    for r in readings:
        h_str = r.timestamp.strftime("%H:00")
        if h_str not in hourly_map:
            hourly_map[h_str] = {"temp": [], "humidity": [], "wind": []}
        if r.temperature: hourly_map[h_str]["temp"].append(r.temperature)
        if r.humidity: hourly_map[h_str]["humidity"].append(r.humidity)
        if r.wind_speed: hourly_map[h_str]["wind"].append(r.wind_speed)

    trend = []
    for h_str, data in list(hourly_map.items())[-8:]:
        trend.append({
            "time": h_str,
            "Temp": round(sum(data["temp"])/len(data["temp"]), 1) if data["temp"] else 28.0,
            "Humidity": round(sum(data["humidity"])/len(data["humidity"]), 1) if data["humidity"] else 60.0,
            "WindSpeed": round(sum(data["wind"])/len(data["wind"]), 1) if data["wind"] else 8.0,
        })

    return {
        "temperature": latest.temperature if latest and latest.temperature else 29.0,
        "humidity": latest.humidity if latest and latest.humidity else 62.0,
        "wind_speed": latest.wind_speed if latest and latest.wind_speed else 8.4,
        "wind_direction": latest.wind_direction if latest and latest.wind_direction else 180.0,
        "pressure": latest.pressure if latest and latest.pressure else 1013.2,
        "rainfall": latest.rainfall if latest and latest.rainfall else 0.0,
        "correlation_insight": "Low wind speed conditions (< 5 km/h) combined with 62% relative humidity are contributing to particulate accumulation in Industrial Zone B.",
        "trend": trend
    }

@router.get("/water-quality")
def get_water_quality_telemetry(db: Session = Depends(get_db)):
    latest = db.query(SensorReading).order_by(desc(SensorReading.timestamp)).first()
    
    ph_val = latest.ph if latest and latest.ph else 7.3
    turb_val = latest.turbidity if latest and latest.turbidity else 2.1
    do_val = latest.dissolved_oxygen if latest and latest.dissolved_oxygen else 7.8
    cond_val = latest.conductivity if latest and latest.conductivity else 450.0
    tds_val = latest.tds if latest and latest.tds else 220.0

    status = "Good"
    if ph_val < 6.5 or ph_val > 8.5 or turb_val > 5.0 or do_val < 5.0:
        status = "Poor"

    return {
        "ph": ph_val,
        "turbidity": turb_val,
        "dissolved_oxygen": do_val,
        "conductivity": cond_val,
        "tds": tds_val,
        "status": status,
        "overall_score": 88,
        "assessment": "River basin sensors indicate optimal aquatic health. Dissolved oxygen levels support local aquatic biodiversity."
    }

@router.get("/noise")
def get_noise_telemetry(db: Session = Depends(get_db)):
    latest = db.query(SensorReading).order_by(desc(SensorReading.timestamp)).first()
    
    start_time = datetime.utcnow() - timedelta(hours=24)
    readings = db.query(SensorReading).filter(SensorReading.timestamp >= start_time).order_by(SensorReading.timestamp).all()
    
    hourly_map = {}
    for r in readings:
        h_str = r.timestamp.strftime("%H:00")
        if h_str not in hourly_map:
            hourly_map[h_str] = []
        if r.noise_db: hourly_map[h_str].append(r.noise_db)

    trend = []
    for h_str, data in list(hourly_map.items())[-8:]:
        trend.append({
            "time": h_str,
            "dB": round(sum(data)/len(data), 1) if data else 65.0,
            "Threshold": 65.0
        })

    curr_db = latest.noise_db if latest and latest.noise_db else 68.4

    return {
        "current_db": curr_db,
        "avg_db": 62.1,
        "max_db": 84.5,
        "min_db": 48.0,
        "trend": trend,
        "hotspots": [
            {"zone": "Zone E - Expressway", "type": "Traffic", "db": 78.4, "status": "Critical Exceedance"},
            {"zone": "Zone B - Industrial Hub", "type": "Industrial", "db": 72.1, "status": "Moderate Warning"},
            {"zone": "Zone A - Commercial Center", "type": "Commercial", "db": 68.0, "status": "Within Daytime Limit"},
            {"zone": "Zone C - Residential Suburbs", "type": "Residential", "db": 54.2, "status": "Optimal Baseline"}
        ]
    }

@router.get("/smart-waste")
def get_smart_waste_telemetry(db: Session = Depends(get_db)):
    bins = [
        {"id": "Bin #17", "location": "Zone B - Industrial Logistics", "fill_level": 87.0, "status": "High Capacity", "prediction": "Critical capacity in 1.5 hrs", "last_collection": "2 days ago"},
        {"id": "Bin #04", "location": "Zone A - Commercial Center", "fill_level": 64.0, "status": "Moderate", "prediction": "Collection needed tomorrow", "last_collection": "1 day ago"},
        {"id": "Bin #09", "location": "Zone E - Expressway Toll Plaza", "fill_level": 42.0, "status": "Normal", "prediction": "Capacity optimal", "last_collection": "Yesterday"},
        {"id": "Bin #22", "location": "Zone C - Residential Suburbs", "fill_level": 28.0, "status": "Optimal", "prediction": "Capacity optimal", "last_collection": "Today 08:00"}
    ]
    return {
        "total_bins": 24,
        "full_bins": 3,
        "overflow_risk": 2,
        "collection_required": 4,
        "bins": bins
    }
