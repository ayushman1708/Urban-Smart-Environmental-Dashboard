from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from app.db.session import Base

class Threshold(Base):
    __tablename__ = "thresholds"

    id = Column(Integer, primary_key=True, index=True)
    parameter = Column(String, unique=True, index=True, nullable=False) # AQI, PM2.5, PM10, Noise, pH, Waste
    warning_limit = Column(Float, nullable=False)
    critical_limit = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    description = Column(String, nullable=True)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    alert_code = Column(String, index=True, nullable=False)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    sensor_id = Column(Integer, ForeignKey("sensors.id"), nullable=True)
    parameter = Column(String, nullable=False)
    current_value = Column(Float, nullable=False)
    threshold_value = Column(Float, nullable=False)
    severity = Column(String, nullable=False) # INFO, LOW, MEDIUM, HIGH, CRITICAL
    message = Column(String, nullable=False)
    status = Column(String, default="Active") # Active, Acknowledged, Resolved
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
