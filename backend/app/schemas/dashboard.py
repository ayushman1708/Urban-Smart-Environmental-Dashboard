from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class KPIMetric(BaseModel):
    title: str
    value: str
    raw_value: float
    unit: str
    status: str # Good, Moderate, Poor, Critical, High
    trend: str # up, down, stable
    change_percentage: float
    last_updated: str

class OverviewSummaryResponse(BaseModel):
    current_aqi: KPIMetric
    pm25: KPIMetric
    pm10: KPIMetric
    temperature: KPIMetric
    humidity: KPIMetric
    active_alerts_count: int
    system_status: str
    total_sensors: int
    online_sensors: int

class RecentAlertItem(BaseModel):
    id: int
    alert_code: str
    zone_name: str
    parameter: str
    current_value: float
    threshold_value: float
    severity: str
    message: str
    timestamp: str

class EnvironmentalStatusItem(BaseModel):
    category: str # Air Quality, Weather, Water Quality, Noise, Smart Waste
    status: str
    health_indicator: str
    latest_reading: str
    trend_description: str
