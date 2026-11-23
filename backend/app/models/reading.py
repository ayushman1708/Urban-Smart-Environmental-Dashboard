from datetime import datetime
from sqlalchemy import Column, Integer, Float, Boolean, DateTime, ForeignKey, Index
from app.db.session import Base

class SensorReading(Base):
    __tablename__ = "sensor_readings"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensors.id"), nullable=False, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Air Quality
    aqi = Column(Integer, nullable=True)
    pm25 = Column(Float, nullable=True)
    pm10 = Column(Float, nullable=True)
    co = Column(Float, nullable=True)
    no2 = Column(Float, nullable=True)
    o3 = Column(Float, nullable=True)
    
    # Weather
    temperature = Column(Float, nullable=True)
    humidity = Column(Float, nullable=True)
    wind_speed = Column(Float, nullable=True)
    wind_direction = Column(Float, nullable=True)
    pressure = Column(Float, nullable=True)
    rainfall = Column(Float, nullable=True)
    
    # Noise
    noise_db = Column(Float, nullable=True)
    
    # Water Quality
    ph = Column(Float, nullable=True)
    turbidity = Column(Float, nullable=True)
    dissolved_oxygen = Column(Float, nullable=True)
    conductivity = Column(Float, nullable=True)
    tds = Column(Float, nullable=True)
    
    # Smart Waste
    waste_fill_percent = Column(Float, nullable=True)
    
    # Context
    is_simulated = Column(Boolean, default=True)
    is_anomaly = Column(Boolean, default=False)

Index("idx_location_time", SensorReading.location_id, SensorReading.timestamp)
