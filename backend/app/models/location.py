from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime
from app.db.session import Base

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    zone_code = Column(String, unique=True, index=True, nullable=False) # Zone A, Zone B, etc.
    description = Column(String, nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    area_type = Column(String, default="Commercial") # Commercial, Industrial, Residential, Park, Traffic
    population_density = Column(String, default="Medium") # High, Medium, Low
    created_at = Column(DateTime, default=datetime.utcnow)
