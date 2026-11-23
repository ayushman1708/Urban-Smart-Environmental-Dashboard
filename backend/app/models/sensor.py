from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from app.db.session import Base

class Sensor(Base):
    __tablename__ = "sensors"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, unique=True, index=True, nullable=False) # e.g. ESP32-001, AQ-001
    sensor_type = Column(String, nullable=False) # Air Quality, Weather, Water Quality, Noise, Smart Waste
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    status = Column(String, default="Online") # Online, Warning, Offline
    battery_level = Column(Float, default=100.0)
    signal_strength = Column(Integer, default=-65) # dBm
    firmware_version = Column(String, default="v2.1.0")
    comm_protocol = Column(String, default="HTTP") # HTTP, MQTT, WebSocket
    last_communication = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
