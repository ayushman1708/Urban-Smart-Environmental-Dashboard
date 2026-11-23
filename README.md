# Urban Smart Environmental Monitoring & AI Decision Support System (EcoSense)

**IoT-Powered Smart City Environmental Intelligence Platform**
*Electronics & Communication Engineering (ECE) Final Year Project*

---

## 🌟 Overview
EcoSense is a full-stack, modular, real-time IoT environmental monitoring and decision support system. Designed for smart city deployments, it ingests multi-parameter sensor data (Air Quality, Weather, Water Quality, Noise, Smart Waste), executes automated anomaly detection and threshold rule evaluation, visualizes geospatial metrics on interactive maps, and delivers context-aware AI recommendations via an integrated assistant.

### 🔑 Key Features (Phase 1 Implemented)
- **Executive Overview Dashboard**: Real-time KPI summary cards (AQI, PM2.5, PM10, Temperature, Humidity, Active Alerts) with trend indicators and status badges.
- **Environmental Intelligence Landing Page**: Interactive system architecture flow diagram (*Sensors → ESP32 → Cloud → AI → Dashboard*), problem statement, and key project capabilities.
- **JWT Authentication & RBAC**: Admin, Authority, Researcher, and Citizen roles with persona quick-switching for live demonstrations.
- **Relational Database & Data Pipeline**: SQLAlchemy ORM backing SQLite/PostgreSQL with pre-seeded 30-day realistic environmental datasets across 5 urban zones.
- **System Health Monitor**: Real-time infrastructure monitoring for FastAPI backend, Database, Sensor Mesh, and API latency.
- **Responsive UI & Dark/Light Theme**: Built with Vite, React 18, TypeScript, Tailwind CSS, and Lucide icons.

---

## 🏗️ System Architecture

```
Sensors (PM2.5, MQ135, DHT22, pH, Ultrasonic)
  └── ESP32 / IoT Gateway
       └── HTTP / REST APIs / WebSockets
            └── FastAPI Backend Server
                 ├── SQLite / PostgreSQL Database
                 ├── Threshold & Anomaly Rule Engine
                 ├── Gemini AI Insights Service
                 └── React 18 + TypeScript Dashboard
```

---

## 🚀 Getting Started

### Prerequisites
- **Python**: 3.10+
- **Node.js**: v18+ (npm v9+)

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m app.db.seed
uvicorn app.main:app --reload --port 8000
```
Backend API will be running at `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend application will be accessible at `http://localhost:5173`.

---

## 📑 License
Academic & Educational Project - ECE Final Year Project.
