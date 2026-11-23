import math
import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine
from app.db.base import Base
from app.models.user import User
from app.models.location import Location
from app.models.sensor import Sensor
from app.models.reading import SensorReading
from app.models.alert import Threshold, Alert
from app.models.insight import AIInsight, SystemLog
from app.core.security import hash_password

def seed_db():
    print("[INIT] Initializing Database Tables...")
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # 1. Seed Users
        if db.query(User).count() == 0:
            print("[SEED] Seeding User Accounts (Admin, Authority, Researcher, Citizen)...")
            users = [
                User(email="admin@ecosense.org", hashed_password=hash_password("admin123"), full_name="Dr. Aris Thorne (System Admin)", role="Admin"),
                User(email="authority@ecosense.org", hashed_password=hash_password("authority123"), full_name="Chief Inspector Sarah Jenkins", role="Authority"),
                User(email="researcher@ecosense.org", hashed_password=hash_password("research123"), full_name="Prof. David Chen (ECE Research Lab)", role="Researcher"),
                User(email="citizen@ecosense.org", hashed_password=hash_password("citizen123"), full_name="Alex Mercer (Local Resident)", role="Citizen"),
            ]
            db.add_all(users)
            db.commit()

        # 2. Seed Locations / Zones
        if db.query(Location).count() == 0:
            print("[SEED] Seeding 5 Urban Environmental Monitoring Zones...")
            locations = [
                Location(name="Downtown Commercial Center", zone_code="Zone A", description="High commercial traffic, shopping centers, dense pedestrian areas", latitude=12.9716, longitude=77.5946, area_type="Commercial", population_density="High"),
                Location(name="Industrial Hub & Logistics", zone_code="Zone B", description="Manufacturing plants, heavy freight logistics, high diesel emissions", latitude=12.9815, longitude=77.6050, area_type="Industrial", population_density="Medium"),
                Location(name="Residential North Suburbs", zone_code="Zone C", description="Quiet suburban neighborhoods, schools, community housing", latitude=12.9600, longitude=77.5800, area_type="Residential", population_density="Medium"),
                Location(name="Eco Green Botanical Park", zone_code="Zone D", description="Urban green canopy, lake basin, botanical garden baseline zone", latitude=12.9500, longitude=77.5900, area_type="Park", population_density="Low"),
                Location(name="High-Traffic Expressway Corridor", zone_code="Zone E", description="Six-lane arterial highway, toll plaza, peak vehicle congestion", latitude=12.9900, longitude=77.6200, area_type="Traffic", population_density="High"),
            ]
            db.add_all(locations)
            db.commit()

        loc_objs = db.query(Location).all()
        loc_map = {l.zone_code: l.id for l in loc_objs}

        # 3. Seed Sensors
        if db.query(Sensor).count() == 0:
            print("[SEED] Seeding 15 IoT Hardware Sensors...")
            sensors = [
                # Zone A
                Sensor(device_id="ESP32-AQ-A1", sensor_type="Air Quality", location_id=loc_map["Zone A"], status="Online", battery_level=94.5, signal_strength=-58, comm_protocol="HTTP"),
                Sensor(device_id="ESP32-WX-A2", sensor_type="Weather", location_id=loc_map["Zone A"], status="Online", battery_level=88.0, signal_strength=-62, comm_protocol="HTTP"),
                Sensor(device_id="ESP32-NS-A3", sensor_type="Noise", location_id=loc_map["Zone A"], status="Online", battery_level=91.0, signal_strength=-65, comm_protocol="HTTP"),
                
                # Zone B
                Sensor(device_id="ESP32-AQ-B1", sensor_type="Air Quality", location_id=loc_map["Zone B"], status="Warning", battery_level=72.0, signal_strength=-74, comm_protocol="HTTP"),
                Sensor(device_id="ESP32-ST-B2", sensor_type="Smart Waste", location_id=loc_map["Zone B"], status="Online", battery_level=85.0, signal_strength=-60, comm_protocol="HTTP"),
                Sensor(device_id="ESP32-WQ-B3", sensor_type="Water Quality", location_id=loc_map["Zone B"], status="Online", battery_level=90.0, signal_strength=-68, comm_protocol="HTTP"),

                # Zone C
                Sensor(device_id="ESP32-AQ-C1", sensor_type="Air Quality", location_id=loc_map["Zone C"], status="Online", battery_level=98.0, signal_strength=-54, comm_protocol="HTTP"),
                Sensor(device_id="ESP32-WX-C2", sensor_type="Weather", location_id=loc_map["Zone C"], status="Online", battery_level=95.0, signal_strength=-56, comm_protocol="HTTP"),
                
                # Zone D
                Sensor(device_id="ESP32-AQ-D1", sensor_type="Air Quality", location_id=loc_map["Zone D"], status="Online", battery_level=99.0, signal_strength=-50, comm_protocol="HTTP"),
                Sensor(device_id="ESP32-WQ-D2", sensor_type="Water Quality", location_id=loc_map["Zone D"], status="Online", battery_level=93.0, signal_strength=-55, comm_protocol="HTTP"),
                Sensor(device_id="ESP32-WX-D3", sensor_type="Weather", location_id=loc_map["Zone D"], status="Online", battery_level=97.0, signal_strength=-52, comm_protocol="HTTP"),

                # Zone E
                Sensor(device_id="ESP32-AQ-E1", sensor_type="Air Quality", location_id=loc_map["Zone E"], status="Online", battery_level=81.0, signal_strength=-69, comm_protocol="HTTP"),
                Sensor(device_id="ESP32-NS-E2", sensor_type="Noise", location_id=loc_map["Zone E"], status="Online", battery_level=86.0, signal_strength=-64, comm_protocol="HTTP"),
                Sensor(device_id="ESP32-ST-E3", sensor_type="Smart Waste", location_id=loc_map["Zone E"], status="Offline", battery_level=12.0, signal_strength=-88, comm_protocol="HTTP"),
            ]
            db.add_all(sensors)
            db.commit()

        # 4. Seed Thresholds
        if db.query(Threshold).count() == 0:
            print("[SEED] Seeding Environmental Threshold Rules...")
            thresholds = [
                Threshold(parameter="AQI", warning_limit=100.0, critical_limit=150.0, unit="AQI", description="Air Quality Index standard threshold"),
                Threshold(parameter="PM2.5", warning_limit=35.0, critical_limit=75.0, unit="ug/m3", description="Particulate Matter < 2.5 micrometers limit"),
                Threshold(parameter="PM10", warning_limit=70.0, critical_limit=150.0, unit="ug/m3", description="Particulate Matter < 10 micrometers limit"),
                Threshold(parameter="Noise", warning_limit=65.0, critical_limit=85.0, unit="dB", description="Urban ambient decibel limit"),
                Threshold(parameter="pH", warning_limit=6.5, critical_limit=8.5, unit="pH", description="Water pH normal range (6.5 - 8.5)"),
                Threshold(parameter="Waste", warning_limit=75.0, critical_limit=90.0, unit="%", description="Smart waste bin fill capacity warning limit"),
            ]
            db.add_all(thresholds)
            db.commit()

        # 5. Seed 30 Days of Hourly Sensor Readings
        if db.query(SensorReading).count() == 0:
            print("[SEED] Generating 30 Days of Realistic Hourly Sensor Readings (~3,600 readings)...")
            start_date = datetime.utcnow() - timedelta(days=30)
            readings = []
            
            sensor_list = db.query(Sensor).all()
            for s in sensor_list:
                loc_id = s.location_id
                loc_code = [k for k, v in loc_map.items() if v == loc_id][0]
                
                # Base factors by Zone
                base_pm25 = 25.0
                if loc_code == "Zone B": base_pm25 = 70.0  # Industrial
                elif loc_code == "Zone E": base_pm25 = 55.0 # Traffic
                elif loc_code == "Zone D": base_pm25 = 12.0 # Park

                for i in range(30 * 24):
                    current_time = start_date + timedelta(hours=i)
                    hour = current_time.hour

                    # Diurnal pollution & weather cycles
                    time_factor = math.sin((hour - 6) * math.pi / 12)  # Peak at 12 PM - 6 PM
                    traffic_peak = 1.4 if (7 <= hour <= 10 or 17 <= hour <= 20) else 0.9

                    pm25_val = max(5.0, (base_pm25 + time_factor * 15.0) * traffic_peak + random.uniform(-4, 4))
                    pm10_val = pm25_val * 1.8 + random.uniform(-3, 5)
                    aqi_val = int(min(500, pm25_val * 1.9 + random.uniform(5, 12)))

                    temp_val = 22.0 + math.sin((hour - 8) * math.pi / 12) * 8.0 + random.uniform(-0.5, 0.5)
                    humidity_val = max(30.0, min(95.0, 75.0 - math.sin((hour - 8) * math.pi / 12) * 25.0 + random.uniform(-2, 2)))
                    noise_val = 52.0 + (18.0 if 8 <= hour <= 22 else 4.0) * traffic_peak + random.uniform(-2, 3)

                    # Simulating occasional anomalies in Zone B
                    is_anomaly = False
                    if loc_code == "Zone B" and i > (28 * 24) and hour in [18, 19, 20]:
                        pm25_val += 75.0
                        pm10_val += 110.0
                        aqi_val += 90
                        is_anomaly = True

                    readings.append(SensorReading(
                        sensor_id=s.id,
                        location_id=loc_id,
                        timestamp=current_time,
                        aqi=aqi_val,
                        pm25=round(pm25_val, 1),
                        pm10=round(pm10_val, 1),
                        co=round(random.uniform(0.4, 2.1), 2),
                        no2=round(random.uniform(15.0, 48.0), 1),
                        o3=round(random.uniform(10.0, 35.0), 1),
                        temperature=round(temp_val, 1),
                        humidity=round(humidity_val, 1),
                        wind_speed=round(max(1.0, 8.5 + random.uniform(-3, 4)), 1),
                        wind_direction=round(random.uniform(0, 360), 0),
                        pressure=round(1013.25 + random.uniform(-4, 4), 1),
                        rainfall=round(max(0.0, random.choice([0, 0, 0, 0, 0, 1.2, 3.5])), 1),
                        noise_db=round(noise_val, 1),
                        ph=round(7.2 + random.uniform(-0.3, 0.3), 2),
                        turbidity=round(2.1 + random.uniform(-0.4, 0.6), 1),
                        dissolved_oxygen=round(7.8 + random.uniform(-0.4, 0.4), 1),
                        conductivity=round(450.0 + random.uniform(-20, 20), 0),
                        tds=round(220.0 + random.uniform(-15, 15), 0),
                        waste_fill_percent=round((i % 72) * 1.35, 1), # Bins fill every 3 days
                        is_simulated=True,
                        is_anomaly=is_anomaly
                    ))

            # Batch insert readings
            db.bulk_save_objects(readings)
            db.commit()

        # 6. Seed Initial Alerts
        if db.query(Alert).count() == 0:
            print("[SEED] Seeding Initial Sample Alerts...")
            alerts = [
                Alert(alert_code="ALT-001", location_id=loc_map["Zone B"], parameter="PM2.5", current_value=121.5, threshold_value=75.0, severity="CRITICAL", message="Severe industrial particulate spike recorded at Industrial Hub Zone B", status="Active", timestamp=datetime.utcnow() - timedelta(minutes=25)),
                Alert(alert_code="ALT-002", location_id=loc_map["Zone E"], parameter="Noise", current_value=78.4, threshold_value=65.0, severity="MEDIUM", message="Ambient traffic noise exceeded 65 dB daytime threshold on Expressway", status="Active", timestamp=datetime.utcnow() - timedelta(hours=1)),
                Alert(alert_code="ALT-003", location_id=loc_map["Zone B"], parameter="Waste", current_value=87.0, threshold_value=75.0, severity="HIGH", message="Smart Waste Container #17 capacity at 87%. Overflow expected within 2 hrs", status="Active", timestamp=datetime.utcnow() - timedelta(hours=2)),
                Alert(alert_code="ALT-004", location_id=loc_map["Zone A"], parameter="AQI", current_value=112.0, threshold_value=100.0, severity="LOW", message="AQI crossed 100 in Commercial Zone A due to evening traffic peak", status="Acknowledged", timestamp=datetime.utcnow() - timedelta(hours=4)),
            ]
            db.add_all(alerts)
            db.commit()

        # 7. Seed System Logs
        if db.query(SystemLog).count() == 0:
            print("[SEED] Seeding Infrastructure System Logs...")
            logs = [
                SystemLog(level="INFO", component="Ingestion", message="ESP32 IoT sensor telemetry stream established successfully over HTTP REST gateway."),
                SystemLog(level="INFO", component="RuleEngine", message="Threshold evaluation rule engine active. Evaluated 3,600 historical parameter frames."),
                SystemLog(level="INFO", component="AIService", message="Gemini AI Environmental Intelligence service initialized with Demo AI Fallback Mode."),
            ]
            db.add_all(logs)
            db.commit()

        print("[SUCCESS] Database seeding completed successfully!")

    except Exception as e:
        print(f"[ERROR] Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
